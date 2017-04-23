
export default function() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
