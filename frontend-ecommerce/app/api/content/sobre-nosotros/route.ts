import { NextRequest, NextResponse } from 'next/server';

// En producción, esto debería estar en una base de datos
// Por ahora usaremos un archivo JSON o localStorage del servidor
const contentData = {
  hero: {
    title: "Innovatech Solutions",
    description: "Transformamos ideas en realidades digitales. Nuestra pasión por la innovación y la excelencia nos impulsa a crear soluciones tecnológicas que superan expectativas."
  },
  mission: {
    title: "Nuestra Misión",
    description: "Impulsar el crecimiento de nuestros clientes a través de soluciones tecnológicas innovadoras y personalizadas, mejorando su eficiencia y competitividad en el mercado."
  },
  vision: {
    title: "Nuestra Visión",
    description: "Ser líderes en el desarrollo de soluciones tecnológicas, reconocidos por nuestra capacidad de innovación, calidad y compromiso con el éxito de nuestros clientes."
  },
  history: {
    title: "Nuestra Historia",
    description: "Desde nuestros inicios en 2010, Innovatech Solutions ha evolucionado de una pequeña startup a una empresa líder en el sector tecnológico. A lo largo de los años, hemos trabajado con una amplia gama de clientes."
  },
  teamTitle: "Conoce a Nuestro Equipo",
  teamDescription: "Profesionales altamente cualificados y apasionados por la tecnología.",
  valuesTitle: "Principios que nos Guían",
  valuesDescription: "Los valores fundamentales detrás de cada proyecto y decisión."
};

// Función helper para verificar si el usuario es admin
async function isAdmin(_request: NextRequest): Promise<boolean> {
  try {
    // Para desarrollo: siempre retorna true
    // En producción, implementa verificación real con JWT
    return true;

    /* Implementación para producción:
    const cookieStore = await cookies();
    const authData = cookieStore.get('auth-storage')?.value;

    if (!authData) return false;

    const parsedAuth = JSON.parse(authData);
    return parsedAuth?.state?.isAdmin === true;
    */
  } catch (_error) {
    console.error('Error verifying admin status');
    return false;
  }
}

// GET - Obtener contenido
export async function GET(_request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: contentData
    });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: 'Error al obtener contenido' },
      { status: 500 }
    );
  }
}

// PATCH - Actualizar contenido (solo admin)
export async function PATCH(request: NextRequest) {
  try {
    // Verificar si es admin
    const adminStatus = await isAdmin(request);

    if (!adminStatus) {
      return NextResponse.json(
        { success: false, error: 'No autorizado' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { field, value } = body;

    if (!field || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Faltan parámetros requeridos' },
        { status: 400 }
      );
    }

    // Actualizar el contenido
    const keys = field.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = contentData;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;

    // En producción, aquí guardarías en la base de datos
    // await saveToDatabase('sobre-nosotros', contentData);

    return NextResponse.json({
      success: true,
      message: 'Contenido actualizado correctamente',
      data: contentData
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { success: false, error: 'Error al actualizar contenido' },
      { status: 500 }
    );
  }
}
