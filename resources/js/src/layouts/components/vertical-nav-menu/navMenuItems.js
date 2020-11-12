/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
    // {
    //     url: null,
    //     name: 'Dashboard',
    //     tag: '2',
    //     tagColor: 'warning',
    //     icon: 'HomeIcon',
    //     i18n: 'Dashboard',
    //     submenu: [
    //         {
    //             url: '/dashboard/analytics',
    //             name: 'Analytics',
    //             slug: 'dashboard-analytics',
    //             i18n: 'Analytics'
    //         },
    //         {
    //             url: '/dashboard/ecommerce',
    //             name: 'eCommerce',
    //             slug: 'dashboard-ecommerce',
    //             i18n: 'eCommerce'
    //         }
    //     ]
    // },
    {
        url: '/campaigns',
        name: 'Campaigns',
        icon: 'SendIcon',
        slug: 'Campaigns',
        i18n: 'Campaigns'
    },
    {
        url: '/rotator',
        name: 'rotator',
        icon: 'GitMergeIcon',
        slug: 'Rotator',
        i18n: 'Rotator'
    },
    {
        url: '/networks',
        name: 'Networks',
        icon: 'CommandIcon',
        slug: 'Networks',
        i18n: 'Networks'
    },
    {
        url: '/offers',
        name: 'Offers',
        icon: 'PackageIcon',
        slug: 'Offers',
        i18n: 'Offers'
    },
    {
        url: '/postback',
        name: 'postback',
        icon: 'BookOpenIcon',
        slug: 'Postback',
        i18n: 'Postback'
    },
    {
        url: '/pixels',
        name: 'pixels',
        icon: 'ClipboardIcon',
        slug: 'Pixels',
        i18n: 'Pixels'
    },
    {
        url: '/leads',
        name: 'leads',
        icon: 'DatabaseIcon',
        slug: 'Leads',
        i18n: 'Leads'
    }
]

