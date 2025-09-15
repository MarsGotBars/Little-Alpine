<script>
  let { tracks, bars, volume, frequencyData = $bindable() } = $props();

  // Basic variables we need
  let currentTrack = $state(0);
  let audioArray = $state([]);
  let audioCtx, analyser, dataArray, source;
  let isAnalyzing = $state(false);
  let animationId;

  // Update volume of all audio elements when volume setting changes
  $effect(() => {
    if (volume !== undefined) {
      audioArray.forEach((audio) => {
        if (audio) {
          audio.volume = volume / 100; // Convert 0-100 to 0-1
        }
      });
    }
  });

  // Setup audio context and connect all elements once
  function setupAudio() {
    if (audioCtx) return; // Already setup

    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = bars * 2;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Connect all audio elements to the same analyser
    audioArray.forEach((audioElement) => {
      if (audioElement) {
        try {
          const source = audioCtx.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
        } catch (error) {
          console.error("Failed to connect audio element:", error);
        }
      }
    });

    console.log("All audio elements connected to analyser");
  }

  // When audio plays, start analyzing
  function handlePlay(e) {
    // Setup audio connections on first play
    setupAudio();

    // Pause all other audio elements
    audioArray.forEach((audio) => {
      if (audio && audio !== e.target && !audio.paused) {
        audio.pause();
      }
    });

    isAnalyzing = true;
  }

  // When audio stops, stop analyzing (with small delay to allow track switching)
  function handleStop() {
    setTimeout(() => {
      // Only stop if no audio is currently playing
      const anyPlaying = audioArray.some((audio) => audio && !audio.paused);
      if (!anyPlaying) {
        isAnalyzing = false;
        // Start the smooth decay animation
        startDecayAnimation();
      }
    }, 50); // Small delay to allow track switching
  }

  // Smooth decay animation for bars when audio stops
  function startDecayAnimation() {
    // 95% wordt behouden en 5% wordt verwijderd
    const decayRate = 0.95;

    function decayStep() {
      if (isAnalyzing) return; // Stop decay if audio starts again

      let stillDecaying = false;
      const newData = frequencyData.map((value) => {
        const newValue = value * decayRate;
        if (newValue > 0.1) {
          // Continue until very close to 0
          stillDecaying = true;
          return newValue;
        }
        return 0; // Set to 0 when essentially zero
      });

      frequencyData = newData;

      // Continue decay if some bars are still decaying
      if (stillDecaying) {
        requestAnimationFrame(decayStep);
      }
    }

    requestAnimationFrame(decayStep);
  }

  // Svelte reactive block - runs whenever isAnalyzing changes
  $effect(() => {
    if (!isAnalyzing || !analyser) return;

    function updateFrequencies() {
      if (!isAnalyzing) return;

      analyser.getByteFrequencyData(dataArray);

      const newFrequencyData = Array.from(dataArray.slice(0, bars));

      frequencyData = newFrequencyData;

      requestAnimationFrame(updateFrequencies);
    }

    updateFrequencies();
  });
</script>

<div class="track-info">
  <p>Current Track</p>
  <h2 class="track-title">{tracks.name[currentTrack]}</h2>

  <div class="controls">
    <span class="analysis-status">
      Analysis: {isAnalyzing ? "🎵 Active" : "⏸️ Inactive"}
    </span>
  </div>

  {#each tracks.path as track, index}
    <audio
      src={track}
      bind:this={audioArray[index]}
      controls
      onplay={handlePlay}
      onpause={handleStop}
      onended={handleStop}
    ></audio>
  {/each}
</div>
