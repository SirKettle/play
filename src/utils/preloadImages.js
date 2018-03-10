
export default (images) => {
  images.forEach((src) => {
    const image = new Image();
    image.src = src;
  });
};
