'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Recintos deportivos IND por region
const RECINTOS = [
  { id: 1, nombre: 'Estadio Carlos Dittborn', region: 'Arica y Parinacota', ciudad: 'Arica', tipo: 'Estadio', capacidad: '17.500', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 2, nombre: 'Estadio Tierra de Campeones', region: 'Tarapaca', ciudad: 'Iquique', tipo: 'Estadio', capacidad: '15.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 3, nombre: 'Estadio Regional Calvo y Bascunan', region: 'Antofagasta', ciudad: 'Antofagasta', tipo: 'Estadio', capacidad: '21.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 4, nombre: 'Estadio Luis Valenzuela Hermosilla', region: 'Atacama', ciudad: 'Copiapo', tipo: 'Estadio', capacidad: '8.000', disciplinas: ['Futbol'] },
  { id: 5, nombre: 'Estadio La Portada', region: 'Coquimbo', ciudad: 'La Serena', tipo: 'Estadio', capacidad: '18.500', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 6, nombre: 'Estadio Elias Figueroa', region: 'Valparaiso', ciudad: 'Valparaiso', tipo: 'Estadio', capacidad: '22.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 7, nombre: 'Estadio Nacional Julio Martinez', region: 'Metropolitana', ciudad: 'Santiago', tipo: 'Estadio', capacidad: '48.000', disciplinas: ['Futbol', 'Atletismo', 'Rugby'] },
  { id: 8, nombre: 'Centro de Alto Rendimiento (CAR)', region: 'Metropolitana', ciudad: 'Santiago', tipo: 'Centro Entrenamiento', capacidad: 'N/A', disciplinas: ['Multiples'] },
  { id: 9, nombre: 'Estadio El Teniente', region: 'OHiggins', ciudad: 'Rancagua', tipo: 'Estadio', capacidad: '14.000', disciplinas: ['Futbol'] },
  { id: 10, nombre: 'Estadio Fiscal de Talca', region: 'Maule', ciudad: 'Talca', tipo: 'Estadio', capacidad: '10.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 11, nombre: 'Estadio Nelson Oyarzun', region: 'Nuble', ciudad: 'Chillan', tipo: 'Estadio', capacidad: '12.000', disciplinas: ['Futbol'] },
  { id: 12, nombre: 'Estadio Ester Roa Rebolledo', region: 'Biobio', ciudad: 'Concepcion', tipo: 'Estadio', capacidad: '30.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 13, nombre: 'Estadio German Becker', region: 'Araucania', ciudad: 'Temuco', tipo: 'Estadio', capacidad: '20.000', disciplinas: ['Futbol', 'Atletismo'] },
  { id: 14, nombre: 'Estadio Parque Saval', region: 'Los Rios', ciudad: 'Valdivia', tipo: 'Estadio', capacidad: '8.000', disciplinas: ['Futbol'] },
  { id: 15, nombre: 'Estadio Chinquihue', region: 'Los Lagos', ciudad: 'Puerto Montt', tipo: 'Estadio', capacidad: '10.000', disciplinas: ['Futbol'] },
  { id: 16, nombre: 'Estadio Fiscal de Punta Arenas', region: 'Magallanes', ciudad: 'Punta Arenas', tipo: 'Estadio', capacidad: '8.000', disciplinas: ['Futbol'] }
];

// Tipos de instalaciones deportivas
const INSTALACIONES = [
  { tipo: 'Estadio', icono: '🏟️', descripcion: 'Recinto para futbol y atletismo con graderias', ejemplos: ['Estadio Nacional', 'Estadios regionales', 'Estadios municipales'] },
  { tipo: 'Polideportivo', icono: '🏀', descripcion: 'Gimnasio techado para multiples disciplinas', ejemplos: ['Basquetbol', 'Voleibol', 'Futsal', 'Gimnasia'] },
  { tipo: 'Piscina', icono: '🏊', descripcion: 'Instalacion acuatica para natacion y deportes de agua', ejemplos: ['Natacion', 'Waterpolo', 'Clavados', 'Nado sincronizado'] },
  { tipo: 'Cancha sintetica', icono: '⚽', descripcion: 'Superficie artificial para futbol y baby futbol', ejemplos: ['Futbol 7', 'Baby futbol', 'Entrenamiento'] },
  { tipo: 'Pista atletica', icono: '🏃', descripcion: 'Pista oval para carreras y pruebas de campo', ejemplos: ['Velocidad', 'Fondo', 'Saltos', 'Lanzamientos'] },
  { tipo: 'Velodromo', icono: '🚴', descripcion: 'Pista para ciclismo de pista', ejemplos: ['Ciclismo de pista', 'Entrenamiento'] },
  { tipo: 'Gimnasio', icono: '🏋️', descripcion: 'Sala con equipamiento para entrenamiento', ejemplos: ['Pesas', 'Maquinas', 'Crossfit', 'Funcional'] },
  { tipo: 'Skatepark', icono: '🛹', descripcion: 'Parque para deportes urbanos', ejemplos: ['Skateboard', 'BMX', 'Scooter', 'Roller'] }
];

// Programas deportivos del Estado
const PROGRAMAS = [
  { nombre: 'Elige Vivir Sano', icono: '🏃', descripcion: 'Promocion de vida activa y saludable para toda la poblacion', beneficiarios: 'Todos', requisitos: 'Ninguno', inscripcion: 'eligevivirsano.gob.cl' },
  { nombre: 'Deporte Formativo', icono: '👧', descripcion: 'Iniciacion deportiva para niños y jovenes en escuelas', beneficiarios: 'Estudiantes 5-18 años', requisitos: 'Ser estudiante', inscripcion: 'A traves del colegio' },
  { nombre: 'Deporte Recreativo', icono: '🎯', descripcion: 'Actividades deportivas comunitarias y familiares', beneficiarios: 'Comunidad', requisitos: 'Ninguno', inscripcion: 'Municipalidad' },
  { nombre: 'Alto Rendimiento', icono: '🏅', descripcion: 'Apoyo a deportistas de elite con proyeccion internacional', beneficiarios: 'Deportistas elite', requisitos: 'Ranking nacional', inscripcion: 'Federacion deportiva' },
  { nombre: 'FONDEPORTE', icono: '💰', descripcion: 'Financiamiento para proyectos deportivos', beneficiarios: 'Organizaciones', requisitos: 'Personalidad juridica', inscripcion: 'fondeporte.cl' },
  { nombre: 'Centros Crecer', icono: '🌟', descripcion: 'Espacios deportivos gratuitos en sectores vulnerables', beneficiarios: 'Comunidades vulnerables', requisitos: 'Vivir en sector', inscripcion: 'Presencial en centro' }
];

// Federaciones deportivas principales
const FEDERACIONES = [
  { nombre: 'ANFP', deporte: 'Futbol', icono: '⚽', web: 'anfp.cl', afiliados: '500.000+' },
  { nombre: 'FECHIBA', deporte: 'Basquetbol', icono: '🏀', web: 'fechiba.cl', afiliados: '30.000+' },
  { nombre: 'FEVOCHI', deporte: 'Voleibol', icono: '🏐', web: 'fevochi.cl', afiliados: '25.000+' },
  { nombre: 'FEDACHI', deporte: 'Atletismo', icono: '🏃', web: 'fedachi.cl', afiliados: '15.000+' },
  { nombre: 'FENACHI', deporte: 'Natacion', icono: '🏊', web: 'fenachi.cl', afiliados: '20.000+' },
  { nombre: 'FECHITRI', deporte: 'Triatlon', icono: '🏊‍♂️', web: 'triatlon.cl', afiliados: '5.000+' },
  { nombre: 'FECHICI', deporte: 'Ciclismo', icono: '🚴', web: 'fechici.cl', afiliados: '10.000+' },
  { nombre: 'FETECH', deporte: 'Tenis', icono: '🎾', web: 'fetech.cl', afiliados: '40.000+' }
];

// Beneficios del deporte
const BENEFICIOS = [
  { beneficio: 'Salud cardiovascular', descripcion: 'Fortalece el corazon y mejora la circulacion sanguinea', icono: '❤️' },
  { beneficio: 'Control de peso', descripcion: 'Quema calorias y ayuda a mantener un peso saludable', icono: '⚖️' },
  { beneficio: 'Salud mental', descripcion: 'Reduce estres, ansiedad y mejora el estado de animo', icono: '🧠' },
  { beneficio: 'Fortaleza osea', descripcion: 'Aumenta la densidad osea y previene osteoporosis', icono: '🦴' },
  { beneficio: 'Socializacion', descripcion: 'Fomenta relaciones sociales y trabajo en equipo', icono: '🤝' },
  { beneficio: 'Disciplina', descripcion: 'Desarrolla habitos, constancia y autodisciplina', icono: '🎯' }
];

// Glosario deportivo
const GLOSARIO = [
  { termino: 'IND', definicion: 'Instituto Nacional de Deportes, organismo rector del deporte en Chile' },
  { termino: 'FONDEPORTE', definicion: 'Fondo Nacional para el Fomento del Deporte' },
  { termino: 'CAR', definicion: 'Centro de Alto Rendimiento para deportistas de elite' },
  { termino: 'Deporte formativo', definicion: 'Practica deportiva orientada al aprendizaje en niños y jovenes' },
  { termino: 'Alto rendimiento', definicion: 'Nivel deportivo competitivo de excelencia nacional e internacional' },
  { termino: 'Federacion', definicion: 'Organizacion que rige y organiza un deporte a nivel nacional' },
  { termino: 'Club deportivo', definicion: 'Organizacion de base donde se practica deporte' },
  { termino: 'Licencia deportiva', definicion: 'Habilitacion para competir oficialmente en una federacion' },
  { termino: 'ODESUR', definicion: 'Organizacion Deportiva Suramericana' },
  { termino: 'Juegos Panamericanos', definicion: 'Competencia multideportiva de las Americas' },
  { termino: 'Comite Olimpico', definicion: 'Organizacion que representa al pais en eventos olimpicos' },
  { termino: 'Fair Play', definicion: 'Juego limpio, etica y respeto en la practica deportiva' }
];

export default function DeportePage() {
  const [busqueda, setBusqueda] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [edad, setEdad] = useState('');
  const [fcReposo, setFcReposo] = useState('');

  const recintosFiltrados = RECINTOS.filter(recinto =>
    (recinto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    recinto.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    recinto.ciudad.toLowerCase().includes(busqueda.toLowerCase())) &&
    (tipoFiltro === '' || recinto.tipo === tipoFiltro)
  );

  const calcularZonasFC = () => {
    if (!edad) return null;

    const edadNum = parseInt(edad);
    const fcReposoNum = fcReposo ? parseInt(fcReposo) : 60;

    // Formula de Karvonen
    const fcMax = 220 - edadNum;
    const reservaFC = fcMax - fcReposoNum;

    const zonas = [
      { zona: 1, nombre: 'Recuperacion', min: 50, max: 60, color: 'bg-blue-500' },
      { zona: 2, nombre: 'Quema grasa', min: 60, max: 70, color: 'bg-green-500' },
      { zona: 3, nombre: 'Aerobica', min: 70, max: 80, color: 'bg-yellow-500' },
      { zona: 4, nombre: 'Anaerobica', min: 80, max: 90, color: 'bg-orange-500' },
      { zona: 5, nombre: 'Maxima', min: 90, max: 100, color: 'bg-red-500' }
    ];

    return {
      fcMax,
      fcReposo: fcReposoNum,
      zonas: zonas.map(z => ({
        ...z,
        fcMin: Math.round(fcReposoNum + (reservaFC * z.min / 100)),
        fcMax: Math.round(fcReposoNum + (reservaFC * z.max / 100))
      }))
    };
  };

  const zonasFC = calcularZonasFC();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">⚽</span>
            <h1 className="text-4xl font-bold mb-2">Deporte</h1>
            <p className="text-green-100">Recintos deportivos, programas IND y federaciones</p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🏟️ 16 Recintos</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🏅 8 Federaciones</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">🧮 Calculadora FC</span>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Recintos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏟️</span> Buscador de Recintos Deportivos
          </h2>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Buscar por region, ciudad o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
              />
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="" className="bg-gray-800">Todos los tipos</option>
                <option value="Estadio" className="bg-gray-800">Estadio</option>
                <option value="Centro Entrenamiento" className="bg-gray-800">Centro Entrenamiento</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Encontrados: {recintosFiltrados.length} recintos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {recintosFiltrados.map((recinto) => (
              <motion.div
                key={recinto.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white">{recinto.nombre}</h3>
                  <span className="px-2 py-1 bg-green-500/30 rounded text-xs text-green-200">{recinto.tipo}</span>
                </div>
                <p className="text-green-300 text-sm">{recinto.ciudad}, {recinto.region}</p>
                <div className="mt-2 text-sm text-gray-300 space-y-1">
                  <p>👥 Capacidad: {recinto.capacidad}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {recinto.disciplinas.map((d, i) => (
                      <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">{d}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Calculadora de Zonas FC */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🧮</span> Calculadora de Zonas de Frecuencia Cardiaca
          </h2>

          <div className="bg-gradient-to-br from-emerald-600/30 to-green-600/30 rounded-2xl p-6 border border-emerald-500/30">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Tu edad (años)</label>
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  placeholder="Ej: 30"
                  min="10"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">FC en reposo (opcional)</label>
                <input
                  type="number"
                  value={fcReposo}
                  onChange={(e) => setFcReposo(e.target.value)}
                  placeholder="Ej: 60 (por defecto)"
                  min="40"
                  max="100"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {zonasFC && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Tus zonas de entrenamiento</h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">FC Maxima</p>
                    <p className="text-2xl font-bold text-white">{zonasFC.fcMax} bpm</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {zonasFC.zonas.map((zona) => (
                    <div key={zona.zona} className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full ${zona.color}`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-white font-medium">Zona {zona.zona}: {zona.nombre}</span>
                          <span className="text-gray-300">{zona.fcMin} - {zona.fcMax} bpm</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                          <div className={`h-2 rounded-full ${zona.color}`} style={{ width: `${zona.max}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">* Calculado con formula de Karvonen. Consulta un profesional para entrenamiento especifico.</p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Tipos de Instalaciones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏀</span> Tipos de Instalaciones Deportivas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INSTALACIONES.map((inst, i) => (
              <motion.div
                key={inst.tipo}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-xl p-5 border border-green-500/30"
              >
                <div className="text-4xl mb-3">{inst.icono}</div>
                <h3 className="font-bold text-white">{inst.tipo}</h3>
                <p className="text-gray-300 text-sm mt-2">{inst.descripcion}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {inst.ejemplos.slice(0, 3).map((ej, j) => (
                    <span key={j} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">{ej}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Programas Deportivos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏅</span> Programas Deportivos del Estado
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROGRAMAS.map((programa, i) => (
              <motion.div
                key={programa.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/10 backdrop-blur rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{programa.icono}</span>
                  <h3 className="font-bold text-white">{programa.nombre}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-3">{programa.descripcion}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-green-300">👥 {programa.beneficiarios}</p>
                  <p className="text-gray-400">📋 {programa.requisitos}</p>
                  <p className="text-yellow-400">📝 {programa.inscripcion}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Federaciones */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🏆</span> Federaciones Deportivas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEDERACIONES.map((fed, i) => (
              <motion.div
                key={fed.nombre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-4 border border-green-500/30 text-center"
              >
                <span className="text-4xl mb-2 block">{fed.icono}</span>
                <h3 className="font-bold text-white">{fed.nombre}</h3>
                <p className="text-green-300 text-sm">{fed.deporte}</p>
                <p className="text-xs text-gray-400 mt-2">👥 {fed.afiliados}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Beneficios del Deporte */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>💪</span> Beneficios del Deporte
          </h2>

          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl p-6 border border-green-500/30">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BENEFICIOS.map((item, i) => (
                <div key={item.beneficio} className="flex gap-3">
                  <span className="text-3xl">{item.icono}</span>
                  <div>
                    <h4 className="font-bold text-white">{item.beneficio}</h4>
                    <p className="text-sm text-gray-400">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Glosario */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>📖</span> Glosario Deportivo
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {GLOSARIO.map((item, i) => (
              <motion.div
                key={item.termino}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition"
              >
                <span className="font-bold text-green-400">{item.termino}</span>
                <p className="text-sm text-gray-400 mt-1">{item.definicion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recursos */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'IND', url: 'https://www.ind.cl', desc: 'Instituto Nacional de Deportes' },
              { nombre: 'Elige Vivir Sano', url: 'https://www.eligevivirsano.gob.cl', desc: 'Vida saludable y activa' },
              { nombre: 'Comite Olimpico', url: 'https://www.coch.cl', desc: 'Comite Olimpico de Chile' },
              { nombre: 'FONDEPORTE', url: 'https://www.fondeporte.cl', desc: 'Fondos para el deporte' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition"
              >
                <h3 className="font-bold text-white">{recurso.nombre}</h3>
                <p className="text-sm text-gray-400">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>Deporte - Parte de <a href="https://newcool-informada.vercel.app" className="text-green-400 hover:underline">NewCooltura Informada</a></p>
          <p className="text-sm mt-1">El deporte es salud y bienestar para todos</p>
        </div>
      </footer>
    </div>
  );
}
