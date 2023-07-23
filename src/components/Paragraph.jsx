const Paragraph = ({ children, className }) => {
  return (
    <div className={`${className} text-xl md:text-2xl leading-nonebg-white`}>
      {children}
    </div>
  );
};

export default Paragraph;
