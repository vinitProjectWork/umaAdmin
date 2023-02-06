const DeleteCategory = ({ data }) => {
  const { name } = data.attributes
  return (
    <div className="font-medium text-red-500">{`Are you sure you want to delete ${name}?`}</div>
  )
}

export default DeleteCategory
