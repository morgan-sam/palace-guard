const Paragraph = ({ children, className }) => {
  return (
    <p className={`${className} text-base leading-nonebg-white`}>{children}</p>
  );
};

export default Paragraph;
