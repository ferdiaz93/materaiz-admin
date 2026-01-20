// routes
import { PATHS } from '../../../routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/features/auth/useAuthContext';
import { isPathAuthorized } from 'src/features/auth/utils';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const iconifyIcon = (name: string) => (
  <Iconify
    icon={name}
    sx={{
      width: 1,
      height: 1,
    }}
  />
);

const ICONS = {
  myCourses: iconifyIcon('eva:book-open-outline'),
  account: iconifyIcon('eva:person-outline'),
  allCourses: iconifyIcon('eva:book-outline'),
  grid: iconifyIcon('eva:grid-outline'),
  message: iconifyIcon('eva:message-square-outline'),
  addon: iconifyIcon('eva:shopping-bag-outline'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'materaiz',
    items: [
      {
        title: 'User',
        path: PATHS.dashboard.adminUsers.root,
        icon: ICONS.account,
      },
      {
        title: 'Categorías',
        path: PATHS.dashboard.categories.root,
        icon: ICONS.grid,
      },
      {
        title: 'Productos',
        path: PATHS.dashboard.products.root,
        icon: ICONS.allCourses,
      },
      {
        title: 'Compras',
        path: PATHS.dashboard.orders.root,
        icon: ICONS.myCourses,
      },
      {
        title: 'Consultas',
        path: PATHS.dashboard.contactMessages.root,
        icon: ICONS.message,
      },{
        title: 'Extras y personalizaciones',
        path: PATHS.dashboard.addons.root,
        icon: ICONS.addon,
      },
    ],
  },
];

const useNavConfig = () => {
  const authCtx = useAuthContext();
  const visibleNavConfig: typeof navConfig = navConfig;
  // navConfig.forEach((nav) => {
  //   const visibleItems = nav.items.filter((item) => isPathAuthorized(authCtx.roles, item.path));
  //   console.log('visibleItems', visibleItems);
  //   if (visibleItems.length > 0) {
  //     visibleNavConfig.push({
  //       ...nav,
  //       items: visibleItems,
  //     });
  //   }
  // });
  return visibleNavConfig;
};

export default useNavConfig;
