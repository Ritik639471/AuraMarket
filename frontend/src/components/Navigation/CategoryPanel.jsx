// CategoryPanel.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { MdClose } from "react-icons/md";
import { Divider } from '@mui/material';
import CategoryCollapse from '../CategoryCollapse';
import './panel.css';

const CategoryPanel = (props) => {
  const toggleDrawer = (newOpen) => () => {
    props.setIsOpenCategoryPanel(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="category-title">
        Shop by Categories
        <MdClose onClick={toggleDrawer(false)} className="icon-btn" />
      </h3>
      <Divider />
      <div className="scroll">
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
