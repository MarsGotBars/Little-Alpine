<div class="linescan"></div>

<style>
  .linescan {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 100;
    opacity: 1;
  }

  .linescan::before {
    content: "";
    position: absolute;
    height: 200vh;
    width: 200vw;
    left: -50vw;
    top: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      15deg,
      transparent 0px,
      transparent 2px,
      rgba(0, 0, 0, 0.25) .375rem,
      rgba(0, 0, 0, 0.25) .375rem,
      transparent 3px,
      transparent 4px
    );
    mix-blend-mode: multiply;
    animation: linescan 80s linear infinite;
  }

  @keyframes linescan {
    0% {
      transform: translateY(-100vh);
    }
    100% {
      transform: translateY(0vh);
    }
  }
</style>
