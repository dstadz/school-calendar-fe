import { useRecoilState } from 'recoil'
import { templateFormOpen, selectedarr } from './atoms'

const cloneIndex = (items, id) => ({
  clone: items.map((item) => ({ ...item })),
  index: items.findIndex((item) => item.id === id),
});

export const UseAddToSelected = () => {
  const [selected, setSelected] = useRecoilState(selectedarr);
  return (product) => {
    const { clone, index } = cloneIndex(selected, product.id);
    
    
    
    
    
    // templateForm
    // ? selected.includes(newdate)
    //   ? setSelected(selected.filter(date => date !== newdate))
    //   : setSelected(selected.concat(newdate))
    // : alert('pick a template');
  };
};