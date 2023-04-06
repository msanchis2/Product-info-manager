import { lazy } from 'react'

const AppRoutes = [
  //
  //Productos
  //
  {
    path: '/productos/new',
    component: lazy(() => import('../../views/productos/new')),
    meta: {
      navLink: '/productos/new'
    }
  },
  {
    path: '/productos/view/:id',
    component: lazy(() => import('../../views/productos/edit')),
    meta: {
      navLink: '/productos/view'
    }
  },
  {
    path: '/productos/edit/:id',
    component: lazy(() => import('../../views/productos/edit')),
    meta: {
      navLink: '/productos/edit'
    }
  },
  //
  //Integracion
  //
  {
    path: '/integracion/edit/:id',
    component: lazy(() => import('../../views/integracion/edit')),
    meta: {
      navLink: '/integracion/edit'
    }
  },
  {
    path: '/integracion/new',
    component: lazy(() => import('../../views/integracion/edit')),
    meta: {
      navLink: '/integracion/new'
    }
  },
  {
    path: '/integracion/view/:id',
    component: lazy(() => import('../../views/integracion/edit')),
    meta: {
      navLink: '/integracion/view'
    }
  },
  {
    path: '/integracion',
    component: lazy(() => import('../../views/integracion/list'))
  },
  //
  //Multimedia
  //
  {
    path: '/productos',
    component: lazy(() => import('../../views/productos/list'))
  },
  //Multimedia
  {
    path: '/multimedia/new',
    component: lazy(() => import('../../views/multimedia/edit')),
    meta: {
      navLink: '/multimedia/new'
    }
  },
  {
    path: '/multimedia/edit/:id',
    component: lazy(() => import('../../views/multimedia/edit')),
    meta: {
      navLink: '/multimedia/edit'
    }
  },
  
  {
    path: '/multimedia/view/:id',
    component: lazy(() => import('../../views/multimedia/edit')),
    meta: {
      navLink: '/multimedia/view'
    }
  },
  {
    path: '/multimedia',
    component: lazy(() => import('../../views/multimedia/list'))
  },
  //Situaciones
  {
    path: '/situaciones/new',
    component: lazy(() => import('../../views/situaciones/edit')),
    meta: {
      navLink: '/situaciones/new'
    }
  },
  {
    path: '/situaciones/edit/:id',
    component: lazy(() => import('../../views/situaciones/edit')),
    meta: {
      navLink: '/situaciones/edit'
    }
  },
  
  {
    path: '/situaciones/view/:id',
    component: lazy(() => import('../../views/situaciones/edit')),
    meta: {
      navLink: '/situaciones/view'
    }
  },
  {
    path: '/situaciones',
    component: lazy(() => import('../../views/situaciones/list'))
  },
  //Marcas
  {
    path: '/marcas/new',
    component: lazy(() => import('../../views/marcas/edit')),
    meta: {
      navLink: '/marcas/new'
    }
  },
  {
    path: '/marcas/edit/:id',
    component: lazy(() => import('../../views/marcas/edit')),
    meta: {
      navLink: '/marcas/edit'
    }
  },
  
  {
    path: '/marcas/view/:id',
    component: lazy(() => import('../../views/marcas/edit')),
    meta: {
      navLink: '/marcas/view'
    }
  },
  {
    path: '/marcas',
    component: lazy(() => import('../../views/marcas/list'))
  },
  //
  //Grupo Atributos
  //
  {
    path: '/grupo-atributos/edit/:id',
    component: lazy(() => import('../../views/grupoatributos/edit')),
    meta: {
      navLink: '/grupo-atributos/edit'
    }
  },
  {
    path: '/grupo-atributos/view/:id',
    component: lazy(() => import('../../views/grupoatributos/edit')),
    meta: {
      navLink: '/grupo-atributos/view'
    }
  },
  {
    path: '/grupo-atributos/new',
    component: lazy(() => import('../../views/grupoatributos/edit')),
    meta: {
      navLink: '/grupo-atributos/new'
    }
  },
  {
    path: '/grupo-atributos',
    component: lazy(() => import('../../views/grupoatributos/list'))
  },
  //
  //Roles
  //
  {
    path: '/roles/edit/:id',
    component: lazy(() => import('../../views/roles/edit')),
    meta: {
      navLink: '/roles/edit'
    }
  },
  {
    path: '/roles/view/:id',
    component: lazy(() => import('../../views/roles/edit')),
    meta: {
      navLink: '/roles/view'
    }
  },
  {
    path: '/roles/new',
    component: lazy(() => import('../../views/roles/edit')),
    meta: {
      navLink: '/roles/new'
    }
  },
  {
    path: '/roles',
    component: lazy(() => import('../../views/roles/list'))
  },
  //
  //Permisos
  //
  {
    path: '/permisos',
    component: lazy(() => import('../../views/permisos/list'))
  },
  //
  //Atributos
  //
  {
    path: '/atributos/edit/:id',
    component: lazy(() => import('../../views/atributos/edit')),
    meta: {
      navLink: '/atributos/edit'
    }
  },
  {
    path: '/atributos/view/:id',
    component: lazy(() => import('../../views/atributos/edit')),
    meta: {
      navLink: '/atributos/view'
    }
  },
  {
    path: '/atributos/new',
    component: lazy(() => import('../../views/atributos/edit')),
    meta: {
      navLink: '/atributos/new'
    }
  },
  {
    path: '/atributos',
    component: lazy(() => import('../../views/atributos/list'))
  },
  //
  //Categorias
  //
  {
    path: '/categorias/edit/:id',
    component: lazy(() => import('../../views/categorias/edit')),
    meta: {
      navLink: '/categorias/edit'
    }
  },
  {
    path: '/categorias/view/:id',
    component: lazy(() => import('../../views/categorias/edit')),
    meta: {
      navLink: '/categorias/view'
    }
  },
  {
    path: '/categorias/new',
    component: lazy(() => import('../../views/categorias/edit')),
    meta: {
      navLink: '/categorias/new'
    }
  },
  {
    path: '/categorias',
    component: lazy(() => import('../../views/categorias/list'))
  },
  //
  //Usuarios
  //
  {
    path: '/usuarios/edit/:id',
    component: lazy(() => import('../../views/usuarios/edit')),
    meta: {
      navLink: '/usuarios/edit'
    }
  },
  {
    path: '/usuarios/view/:id',
    component: lazy(() => import('../../views/usuarios/edit')),
    meta: {
      navLink: '/usuarios/view'
    }
  },
  {
    path: '/usuarios/new',
    component: lazy(() => import('../../views/usuarios/edit')),
    meta: {
      navLink: '/usuarios/new'
    }
  },
  {
    path: '/usuarios',
    component: lazy(() => import('../../views/usuarios/list'))
  },
  //
  //Idiomas
  //
  {
    path: '/idiomas/edit/:id',
    component: lazy(() => import('../../views/idiomas/edit')),
    meta: {
      navLink: '/idiomas/edit'
    }
  },
  {
    path: '/idiomas/view/:id',
    component: lazy(() => import('../../views/idiomas/edit')),
    meta: {
      navLink: '/idiomas/view'
    }
  },
  {
    path: '/idiomas/new',
    component: lazy(() => import('../../views/idiomas/edit')),
    meta: {
      navLink: '/idiomas/new'
    }
  },
  {
    path: '/idiomas',
    component: lazy(() => import('../../views/idiomas/list'))
  },
  //
  //Empresas
  //
  {
    path: '/empresas/edit/:id',
    component: lazy(() => import('../../views/empresas/edit')),
    meta: {
      navLink: '/empresas/edit'
    }
  },
  {
    path: '/empresas/view/:id',
    component: lazy(() => import('../../views/empresas/edit')),
    meta: {
      navLink: '/empresas/view'
    }
  },
  {
    path: '/empresas/new',
    component: lazy(() => import('../../views/empresas/edit')),
    meta: {
      navLink: '/empresas/new'
    }
  },
  {
    path: '/empresas',
    component: lazy(() => import('../../views/empresas/list'))
  },
  //
  //Traducciones
  //
  {
    path: '/traducciones/edit/:id',
    component: lazy(() => import('../../views/traducciones/edit/index')),
    meta: {
      navLink: '/traducciones/edit'
    }
  },
  {
    path: '/traducciones/view/:id',
    component: lazy(() => import('../../views/traducciones/edit/index')),
    meta: {
      navLink: '/traducciones/view'
    }
  },
  {
    path: '/traducciones/new',
    component: lazy(() => import('../../views/traducciones/new/index')),
    meta: {
      navLink: '/traducciones/new'
    }
  },
  {
    path: '/traducciones',
    component: lazy(() => import('../../views/traducciones/list'))
  },
  //
  //Navision
  //
  {
    path: '/sincronizaciones',
    component: lazy(() => import('../../views/sincronizaciones/sincro'))
  }
]
export default AppRoutes
