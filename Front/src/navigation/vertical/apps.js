import { Package, Sliders, Shield, List, Feather, Briefcase, GitBranch, Users, Slack, DownloadCloud, File, GitHub, Database, Archive, Twitch, Airplay } from 'react-feather'

export default [
  {
    id: 'productos',
    title: 'Productos',
    icon: <Package size={20} />,
    navLink: '/productos'
  },
  {
    id: 'multimedia',
    title: 'Multimedia',
    icon: <File size={20} />,
    navLink: '/multimedia'
  },
  {
    id: 'atributos',
    title: 'Atributos',
    icon: <Sliders size={20} />,
    navLink: '/atributos'
  },
  {
    id: 'grupoatributos',
    title: 'GrupoAtributos',
    icon: <GitBranch size={20} />,
    navLink: '/grupo-atributos'
  },
  {
    id: 'roles',
    title: 'Roles',
    icon: <GitHub size={20} />,
    navLink: '/roles'
  },
  {
    id: 'permisos',
    title: 'Permisos',
    icon: <Shield size={20} />,
    navLink: '/permisos'
  },
  {
    id: 'categorias',
    title: 'Categorias',
    icon: <List size={20} />,
    navLink: '/categorias'
  },
  {
    id: 'Marcas',
    title: 'Marcas',
    icon: <Twitch size={20} />,
    navLink: '/marcas'
  },
  {
    id: 'situaciones',
    title: 'Situaciones',
    icon: <Archive size={20} />,
    navLink: '/situaciones'
  },
  {
    id: 'idiomas',
    title: 'Idiomas',
    icon: <Slack size={20} />,
    navLink: '/idiomas'
  },
  {
    id: 'traducciones',
    title: 'Traducciones',
    icon: <Feather size={20} />,
    navLink: '/traducciones'
  },
  {
    id: 'usuarios',
    title: 'Usuarios',
    icon: <Users size={20} />,
    navLink: '/usuarios'
  },
  {
    id: 'empresas',
    title: 'Empresas',
    icon: <Briefcase size={20} />,
    navLink: '/empresas'
  },
  {
    id: 'sincronizaciones',
    title: 'Sincronizaciones',
    icon: <Airplay size={20} />,
    navLink: '/sincronizaciones'
  },
  {
    id: 'Integracion',
    title: 'Integracion',
    icon: <Database size={20} />,
    navLink: '/integracion'
  },
  {
    id: 'documentacion_api',
    title: 'Documentacion API',
    icon: <DownloadCloud size={20} />,
    navLink: '',
    downloadUrl: '/Documentacion_API.pdf'
  }
]
