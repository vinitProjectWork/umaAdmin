const ProductSpecification = ({ data }) => {
  const { name, details } = data;
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">{`U&E ${name}`}</p>
      <div dangerouslySetInnerHTML={{ __html: details }} />
    </div>
  );
};

export default ProductSpecification;
