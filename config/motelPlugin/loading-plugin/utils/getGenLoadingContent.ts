export default (loadingSrc: string) =>
  `
  const loading = document.createElement('div')
  loading.style.position = "fixed";
  loading.style.top = "50%";
  loading.style.left = "50%";
  loading.style.transform = "translate(-50%,-50%)";
  const img = document.createElement('img')
  img.src = "${loadingSrc}"
  loading.appendChild(img)
  const root = document.querySelector('#root');
  if (root) root.appendChild(loading)
`;
