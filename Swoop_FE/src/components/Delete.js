import { Button } from "@mui/material";
import { deleteItem } from "../services";


export default function Delete ({ setItems, setFilteredItems, items, item }) {

  const handleClick = () => {

  deleteItemClick(item.seller, item._id)
}
const itemsList = items;
const deleteItemClick = async (seller, id) => {
  try {
    const deletedItem = await deleteItem(seller, id);

    setItems([...items.filter(item => item._id !== id)])
    setFilteredItems(itemsList.filter(item => item._id !== id));

  } catch (e) {
    console.log(e);
  }
}

   return (
    <Button variant='contained' p={0} sx={{fontSize: 12, padding:0, lineHeight: 1}} size='small' onClick={handleClick}>Delete</Button>
   )
}