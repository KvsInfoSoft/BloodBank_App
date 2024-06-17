const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
    // {
    //   id: 'ui-element',
    //   title: 'UI ELEMENT',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'component',
    //       title: 'Component',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb',
    //           title: 'Breadcrumb',
    //           type: 'item',
    //           url: '/basic/breadcrumb'
    //         },
    //         {
    //           id: 'pagination',
    //           title: 'Pagination',
    //           type: 'item',
    //           url: '/basic/pagination'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'tabs-pills',
    //           title: 'Tabs & Pills',
    //           type: 'item',
    //           url: '/basic/tabs-pills'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      id: 'ui-forms',
      title: 'Menu & Components',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Collection Record',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/collection/collectionRecord'
        },
        {
          id: 'forms',
          title: 'Donor Record',
          type: 'item',
          icon: 'feather icon-file-plus',
          url: '/donor/donorRecord'
        },
        {
          id: 'forms',
          title: 'Issue Record',
          type: 'item',
          icon: 'feather icon-life-buoy',
          url: '/issue/issueRecord'
        },
        {
          id: 'forms',
          title: 'Stock Record',
          type: 'item',
          icon: 'feather icon-bar-chart-2',
          url: '/stock/stockRecord'
        }
      ]
    }
  ]
};

export default menuItems;
