// find all inputs
const inputs = document.querySelectorAll('.controller input');

function handleUpdate() {
  //suffix it is px or %
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => {
  input.addEventListener('change', handleUpdate);
  input.addEventListener('mousemove', handleUpdate);
});
