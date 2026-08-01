// CategoryPanel.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { MdClose } from "react-icons/md";
import { Divider } from '@mui/material';
import CategoryCollapse from '../CategoryCollapse';

const CategoryPanel = (props) => {
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCategoryPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="w-full">
      <h3 className="p-3 text-[16px] font-medium flex justify-between items-center">
        Shop by Categories
        <MdClose onClick={toggleDrawer(false)} className="text-[20px] cursor-pointer" />
      </h3>
      <Divider />
      <div className="max-h-[80vh] overflow-y-auto">
        <CategoryCollapse />
      </div>
    </Box>
  );

  return (
    <Drawer open={props.isOpenCategoryPanel} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default CategoryPanel;
