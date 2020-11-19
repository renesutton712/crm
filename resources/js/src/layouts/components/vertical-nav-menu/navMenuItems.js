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
    // {
    //     url: null,
    //     name: 'Postbacks',
    //     icon: 'ClipboardIcon',
    //     slug: 'Postbacks',
    //     i18n: 'Postbacks',
    //     submenu: [
    //         {
    //             url: '/conversions',
    //             name: 'conversions',
    //             icon: 'BookOpenIcon',
    //             slug: 'Conversions',
    //             i18n: 'Conversions'
    //         },
    //         {
    //             url: '/postbacks',
    //             name: 'postbacks',
    //             icon: 'ClipboardIcon',
    //             slug: 'Postbacks',
    //             i18n: 'Postbacks'
    //         },
    //         {
    //             url: '/iframepixel',
    //             name: 'iframepixel',
    //             icon: 'FramerIcon',
    //             slug: 'Iframes',
    //             i18n: 'Iframes'
    //         },
    //     ]
    // },
    {
        url: '/postbacks',
        name: 'postbacks',
        icon: 'ClipboardIcon',
        slug: 'Postbacks',
        i18n: 'Postbacks'
    },
    {
        url: '/conversions',
        name: 'conversions',
        icon: 'BookOpenIcon',
        slug: 'Conversions',
        i18n: 'Conversions'
    },
    {
        url: '/iframepixel',
        name: 'iframepixel',
        icon: 'FramerIcon',
        slug: 'Iframes pixels',
        i18n: 'Iframes pixels'
    },
    {
        url: '/leads',
        name: 'leads',
        icon: 'DatabaseIcon',
        slug: 'Leads',
        i18n: 'Leads'
    }
]

