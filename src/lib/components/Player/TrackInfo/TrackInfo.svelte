<script>
  let { tracks, bars, volume, frequencyData = $bindable(), selectedTrack } = $props();

  // Basic variables we need
  let audioArray = $state([]);
  let audioCtx = $state(null);
  let analyser, dataArray, source;
  let isAnalyzing = $state(false);
  let animationId;

  // Update volume van alle audio elementen wanneer de volume instelling verandert
  $effect(() => {
    if (volume !== undefined) {
      audioArray.forEach((audio) => { 
        if (audio) {
          audio.volume = volume / 100; // Convert 0-100 naar 0-1
        }
      });
    }
  });

  // Handle selectedTrack changes and play/pause control
  $effect(() => {
    if (selectedTrack?.index !== null && selectedTrack?.index !== undefined && audioArray[selectedTrack.index]) {
      const currentAudio = audioArray[selectedTrack.index];
      
      // Pause all other tracks first
      audioArray.forEach((audio, index) => {
        if (audio && index !== selectedTrack.index && !audio.paused) {
          audio.pause();
        }
      });

      // Control the selected track based on isPlaying state
      if (selectedTrack.isPlaying && currentAudio.paused) {
        currentAudio.play();
      } else if (!selectedTrack.isPlaying && !currentAudio.paused) {
        currentAudio.pause();
      }
    }
  });

  // Setup audio context en connect alle elementen eenmaal
  function setupAudio() {
    if (audioCtx) return; // Already setup

    audioCtx = new AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = bars * 8;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Connect alle audio elementen naar dezelfde analyser
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

  // Wanneer audio speelt, start met analyseren
  function handlePlay(e) {
    // Setup audio connecties bij het eerste speelmoment
    setupAudio();

    // Pauzeer alle andere audio elementen
    audioArray.forEach((audio) => {
      if (audio && audio !== e.target && !audio.paused) {
        audio.pause();
      }
    });

    isAnalyzing = true;
  }

  // Wanneer audio stopt, stop met analyseren (met een kleine vertraging om track switching toe te staan)
  function handleStop() {
    setTimeout(() => {
      // Alleen stoppen als er geen audio wordt afgespeeld
      const anyPlaying = audioArray.some((audio) => audio && !audio.paused);
      if (!anyPlaying) {
        isAnalyzing = false;
        // Start de smooth decay animatie
        startDecayAnimation();
      }
    }, 50); // Small delay to allow track switching
  }

  // Smooth decay animatie voor bars wanneer audio stopt
  function startDecayAnimation() {
    // 95% wordt behouden en 5% wordt verwijderd
    const decayRate = 0.85;

    function decayStep() {
      if (isAnalyzing) return;

      let stillDecaying = false;
      const newData = frequencyData.map((value) => {
        const newValue = value * decayRate;
        if (newValue > 0.1) {
          stillDecaying = true;
          return newValue;
        }
        return 0;
      });

      frequencyData = newData;

      // Continue decay als sommige bars nog vervallen
      if (stillDecaying) {
        requestAnimationFrame(decayStep);
      }
    }

    requestAnimationFrame(decayStep);
  }

  // Svelte reactive block - run wanneer isAnalyzing verandert
  $effect(() => {
    if (!isAnalyzing || !analyser) return;

    function updateFrequencies() {
      if (!isAnalyzing) return;

      analyser.getByteFrequencyData(dataArray);

      const newFrequencyData = Array.from(dataArray);

      frequencyData = newFrequencyData;

      requestAnimationFrame(updateFrequencies);
    }

    updateFrequencies();
  });
</script>

<div class="track-info">
  <p>Current Track</p>
  <h2 class="track-title">
    {selectedTrack?.index !== null && selectedTrack?.index !== undefined 
      ? tracks.name[selectedTrack.index] 
      : 'No track selected'}
  </h2>

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
      class:hidden={true}
    ></audio>
  {/each}
</div>
