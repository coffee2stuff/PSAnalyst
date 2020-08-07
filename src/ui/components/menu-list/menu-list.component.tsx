import React from 'react';
import './menu-list.component.css';

import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CodeIcon from '@material-ui/icons/Code';

interface MenuListItem {
    icon: any;
    title: string;
    subtitle?: string;
}

export class MenuListComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                <List component="nav">
                    {this.menuListItemsArray().map((item: MenuListItem, index: number) => {
                        return (
                            <ListItem button key={index}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} secondary={item.subtitle} />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        );
    }

    private menuListItemsArray = (): Array<MenuListItem> => [
        {
            icon: <HomeIcon />,
            title: 'Home'
        },
        {
            icon: <HistoryIcon />,
            title: 'History',
            subtitle: 'Retrieve all your past personality analyses'
        },
        {
            icon: <SettingsIcon />,
            title: 'Settings',
            subtitle: 'Access application settings'
        },
        {
            icon: <HelpOutlineIcon />,
            title: 'Help & Feedback',
            subtitle: 'Info and feedback submission'
        },
        {
            icon: <CodeIcon />,
            title: 'Source code',
            subtitle: 'This is an open source project'
        }
    ];
}
