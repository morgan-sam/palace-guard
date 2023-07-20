const Paragraph = ({ children, className }) => {
  return (
    <p className={`${className} text-xl md:text-2xl leading-nonebg-white`}>
      {children}
    </p>
  );
};

export default Paragraph;
