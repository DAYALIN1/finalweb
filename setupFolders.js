import fs from 'fs';
import path from 'path';

const folders = [
  'src/assets/images',
  'src/assets/fonts',
  'src/assets/styles',
  'src/components/admin',
  'src/components/client',
  'src/components/shared',
  'src/pages/admin',
  'src/pages/client',
  'src/layouts',
  'src/router',
  'src/services',
  'src/utils',
];

const files = {
  'src/assets/styles/globals.scss': '',
  'src/components/admin/Navbar.jsx': 'const Navbar = () => <nav>Admin Navbar</nav>; export default Navbar;',
  'src/components/admin/Sidebar.jsx': 'const Sidebar = () => <aside>Admin Sidebar</aside>; export default Sidebar;',
  'src/components/client/Header.jsx': 'const Header = () => <header>Header</header>; export default Header;',
  'src/components/client/Footer.jsx': 'const Footer = () => <footer>Footer</footer>; export default Footer;',
  'src/layouts/AdminLayout.jsx': 'const AdminLayout = () => <div>Admin Layout</div>; export default AdminLayout;',
  'src/layouts/ClientLayout.jsx': 'const ClientLayout = () => <div>Client Layout</div>; export default ClientLayout;',
  'src/pages/admin/Login.jsx': 'const Login = () => <div>Admin Login</div>; export default Login;',
  'src/pages/client/Dashboard.jsx': 'const Dashboard = () => <div>Client Dashboard</div>; export default Dashboard;',
};

// Crear carpetas
folders.forEach(folder => {
  fs.mkdirSync(path.resolve(folder), { recursive: true });
});

// Crear archivos
Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(path.resolve(filePath), content);
});

console.log('Project structure created!');
