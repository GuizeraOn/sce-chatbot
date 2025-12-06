export type BubbleType = 'text' | 'image' | 'options' | 'input-text' | 'input-number' | 'redirect' | 'chart';

export interface Option {
    label: string;
    value: string;
}

export interface ChatBubble {
    id: number;
    type: BubbleType;
    content?: string; // For text, question, or image URL
    options?: Option[];
    variable?: string; // For input types or options saving to a variable
    placeholder?: string; // Input placeholder
    redirectUrl?: string; // For redirect type
}

export const chatData: ChatBubble[] = [
    {
        id: 1,
        type: 'text',
        content: '🔥 ¿Quieres transformar tu cuerpo sin necesidad de ir al gimnasio? 🔥'
    },
    {
        id: 2,
        type: 'text',
        content: 'Si quieres perder peso, ganar músculo y mejorar tu salud con entrenamientos de calistenia en casa, tengo algo especial para ti.'
    },
    {
        id: 3,
        type: 'text',
        content: 'En solo 15 minutos al día, puedes tener resultados visibles en 28 días.'
    },
    {
        id: 4,
        type: 'options',
        content: '👉 Antes de mostrarte cómo, cuéntame: ¿cuál es tu mayor desafío hoy?',
        variable: 'motivo selecionado',
        options: [
            { label: 'Perder peso', value: 'Perder peso' },
            { label: 'Ganar masa muscular', value: 'Ganar masa muscular' },
            { label: 'Mejorar mi salud y energía', value: 'Mejorar mi salud y energía' },
            { label: 'Todos', value: 'Todos' }
        ]
    },
    {
        id: 5,
        type: 'input-number',
        content: '¡Perfecto! Cuéntame, ¿qué edad tienes?',
        variable: 'age',
        placeholder: 'Escribe tu edad...'
    },
    {
        id: 6,
        type: 'options',
        content: '¡Genial! ¿Y ya has intentado entrenamientos de calistenia antes?',
        options: [
            { label: 'Sí', value: 'Sí' },
            { label: 'No', value: 'No' }
        ]
    },
    {
        id: 7,
        type: 'options',
        content: 'Entendido. ¿Y cuál es tu objetivo principal hoy?',
        options: [
            { label: 'Perder Peso', value: 'Perder Peso' },
            { label: 'Ganar masa muscular', value: 'Ganar masa muscular' },
            { label: 'Reducir dolores de espalda y articulaciones', value: 'Reducir dolores de espalda y articulaciones' },
            { label: 'Desarrollar flexibilidad', value: 'Desarrollar flexibilidad' }
        ]
    },
    {
        id: 8,
        type: 'options',
        content: '¡Bien! ¿Cómo describirías tu físico actual?',
        options: [
            { label: 'Con sobrepeso', value: 'Con sobrepeso' },
            { label: 'Un poco de sobrepeso', value: 'Un poco de sobrepeso' },
            { label: 'Promedio', value: 'Promedio' },
            { label: 'Delgado', value: 'Delgado' }
        ]
    },
    {
        id: 9,
        type: 'options',
        content: '¿Y cuál sería tu "cuerpo soñado"?',
        options: [
            { label: 'Solo unas tallas menos', value: 'Solo unas tallas menos' },
            { label: 'Fuerte con muchos músculos', value: 'Fuerte con muchos músculos' },
            { label: 'Delgado con músculos definidos', value: 'Delgado con músculos definidos' },
            { label: 'Delgado', value: 'Delgado' }
        ]
    },
    {
        id: 10,
        type: 'text',
        content: '¡Perfecto, vamos a armar un plan exclusivo para ti, amigo!'
    },
    {
        id: 11,
        type: 'input-text',
        content: 'Pero antes, dime, ¿cuál es tu nombre?',
        variable: 'nome',
        placeholder: 'Escribe tu nombre...'
    },
    {
        id: 12,
        type: 'options',
        content: '¿Cómo funciona tu metabolismo?',
        options: [
            { label: 'Gano peso rápidamente, pero lo pierdo lentamente', value: 'Gano peso rápidamente, pero lo pierdo lentamente' },
            { label: 'Me cuesta ganar peso o músculo', value: 'Me cuesta ganar peso o músculo' },
            { label: 'Gano o pierdo peso fácilmente', value: 'Gano o pierdo peso fácilmente' }
        ]
    },
    {
        id: 13,
        type: 'options',
        content: '{{nome}}, ¿hace cuánto tiempo estuviste en la mejor forma física de tu vida?',
        options: [
            { label: 'Hace menos de un año', value: 'Hace menos de un año' },
            { label: 'Hace 1 a 2 años', value: 'Hace 1 a 2 años' },
            { label: 'Hace más de 3 años', value: 'Hace más de 3 años' },
            { label: 'No sabría decirlo', value: 'No sabría decirlo' }
        ]
    },
    {
        id: 14,
        type: 'options',
        content: '{{nome}}, ya casi termino, solo respóndeme unas preguntitas más, por favor. ¿Qué zona del cuerpo te gustaría trabajar primero?',
        options: [
            { label: 'Abdomen', value: 'Abdomen' },
            { label: 'Brazos', value: 'Brazos' },
            { label: 'Piernas', value: 'Piernas' },
            { label: 'Pectorales', value: 'Pectorales' }
        ]
    },
    {
        id: 15,
        type: 'options',
        content: '¿Sueles hacer bastante ejercicio físico?',
        options: [
            { label: 'Casi todos los días', value: 'Casi todos los días' },
            { label: 'Algunas veces a la semana', value: 'Algunas veces a la semana' },
            { label: 'Algunas veces al mes', value: 'Algunas veces al mes' },
            { label: 'Poco', value: 'Poco' }
        ]
    },
    {
        id: 16,
        type: 'options',
        content: 'Entendido {{nome}}, cuéntame, ¿cómo describirías tu día a día?',
        options: [
            { label: 'Paso la mayor parte del día sentado', value: 'Paso la mayor parte del día sentado' },
            { label: 'Hago pausas activas', value: 'Hago pausas activas' },
            { label: 'Estoy de pie todo el día', value: 'Estoy de pie todo el día' }
        ]
    },
    {
        id: 17,
        type: 'options',
        content: '¿Cuántas horas sueles dormir por noche?',
        options: [
            { label: 'Menos de 5 horas', value: 'Menos de 5 horas' },
            { label: '5-6 horas', value: '5-6 horas' },
            { label: '7-8 horas', value: '7-8 horas' },
            { label: 'Más de 8 horas', value: 'Más de 8 horas' }
        ]
    },
    {
        id: 18,
        type: 'options',
        content: '¿Cuál es tu principal motivo para ponerte en forma?',
        options: [
            { label: '💪 Sentirme más seguro con mi cuerpo', value: '💪 Sentirme más seguro con mi cuerpo' },
            { label: '🔋 Sentirme más saludable y con energía', value: '🔋 Sentirme más saludable y con energía' },
            { label: '❤️ Mejorar mi relación de pareja', value: '❤️ Mejorar mi relación de pareja' },
            { label: '🏆 Otros', value: '🏆 Otros' }
        ]
    },
    {
        id: 19,
        type: 'input-number',
        content: '¡Perfecto {{nome}}! Dime, ¿cuál es tu peso actual en kg?',
        variable: 'current_weight',
        placeholder: 'Ej: 75'
    },
    {
        id: 20,
        type: 'input-number',
        content: '¡Entendido! ¿Y cuál es el peso que quieres alcanzar en kg?',
        variable: 'peso desejado',
        placeholder: 'Ej: 70'
    },
    {
        id: 21,
        type: 'text',
        content: '{{nome}}, estoy terminando de armar tu plan de entrenamiento de calistenia. Mientras tanto, déjame mostrarte los resultados de algunos alumnos que hicieron el entrenamiento...'
    },
    {
        id: 22,
        type: 'text',
        content: 'Mira el resultado de Martín, de 53 años, que aun comiendo lo que le gusta, logró perder 17 kg y consiguió librarse del dolor de espalda que lo atormentaba todos los días...'
    },
    {
        id: 23,
        type: 'image',
        content: 'https://i.ibb.co/3yT63khC/th5fa86340e6wg5xilbv75wb.jpg'
    },
    {
        id: 24,
        type: 'text',
        content: 'Y Marcelo, de 37 años. Fue su esposa Valeria quien me buscó y me dijo que él tenía muchos dolores en las articulaciones. Con solo 40 minutos al día, él terminó perdiendo 7 kg y conquistó este resultado increíble...'
    },
    {
        id: 25,
        type: 'image',
        content: 'https://i.ibb.co/PGXjkd6b/40ecccba17e2dbdd5b9cfb6d91d62a5e.jpg'
    },
    {
        id: 26,
        type: 'options',
        content: '{{nome}}, ¿te gustaría tener resultados increíbles como los que ellos tuvieron?',
        options: [
            { label: '👍 ¡SÍ, YO QUIERO!', value: '👍 ¡SÍ, YO QUIERO!' }
        ]
    },
    {
        id: 27,
        type: 'text',
        content: '¿Sabes qué tienen todos ellos en común?'
    },
    {
        id: 28,
        type: 'text',
        content: 'Siguieron el Plan de Entrenamientos personalizado que hice para cada uno de ellos y para más de 3500 hombres en los últimos dos años.'
    },
    {
        id: 29,
        type: 'text',
        content: 'Pero ahora, déjame explicarte cómo funciona... Recibirás entrenamientos personalizados en video-clases exclusivamente para ti, ¡todos los días!'
    },
    {
        id: 30,
        type: 'text',
        content: 'Ejercicios que puedes hacer en casa, sin ningún equipo:'
    },
    {
        id: 31,
        type: 'text',
        content: '✅ Pérdida de peso\n✅ Ganancia de masa magra\n✅ Alivio de dolores de espalda\n✅ Mejora de la postura\n✅ Aumento de testosterona\n✅ Aumento de la libido\n✅ Mejora de la flexibilidad\n✅ Se puede hacer en casa\n✅ Sin aparatos, no necesitas comprar NADA.'
    },
    {
        id: 32,
        type: 'options',
        content: '{{nome}}, ¿estás preparado para esta transformación en tu vida?',
        options: [
            { label: '¡SÍ, ACEPTO EL DESAFÍO!', value: '¡SÍ, ACEPTO EL DESAFÍO!' }
        ]
    },
    {
        id: 33,
        type: 'text',
        content: '{{nome}}, ¡tu Plan de entrenamiento de calistenia para {{motivo selecionado}} está listo!'
    },
    {
        id: 34,
        type: 'text',
        content: 'De acuerdo con la información que me diste, la previsión es que estarás con {{peso desejado}} kg para el {{target_date}}.'
    },
    {
        id: 35,
        type: 'chart',
        content: ''
    },
    {
        id: 36,
        type: 'options',
        content: '¿Estás preparado para esta transformación?',
        options: [
            { label: '¡SÍ, ESTOY PREPARADO!', value: '¡SÍ, ESTOY PREPARADO!' }
        ]
    },
    {
        id: 37,
        type: 'text',
        content: '{{nome}}, no me gusta ver que una mensualidad de calistenia en gimnasios de tu país pueda llegar a costar unos $40 USD al mes. ¡Sin contar nutriólogos y entrenadores personales! Me parece una locura...'
    },
    {
        id: 38,
        type: 'text',
        content: 'Por eso quiero ofrecerte esto sin ningún costo de mensualidad. Sí, es eso mismo, el acompañamiento es totalmente gratuito.'
    },
    {
        id: 39,
        type: 'text',
        content: 'Pero, para mantener todo funcionando y garantizar que tengas la mejor experiencia, cobramos una pequeña cuota de inscripción ÚNICA de SOLO $9 USD. Es el valor que la Plataforma me cobra para hospedar las clases de los entrenamientos.'
    },
    {
        id: 40,
        type: 'text',
        content: 'Esta pequeña contribución me ayuda a mantener todo esto vivo, a continuar apoyando y transformando la vida de tantos hombres. Y es también una forma de sellar nuestro compromiso juntos. ¡Pagas solo 1 vez y tienes acceso para siempre con todas las actualizaciones y nuevos entrenamientos!'
    },
    {
        id: 41,
        type: 'text',
        content: '{{nome}}, además, si en un plazo de 90 días sientes que no estás viendo el cambio que esperabas, te prometo que te devuelvo cada centavo.'
    },
    {
        id: 42,
        type: 'text',
        content: 'Cuando finalices el pago, voy a liberar 3 bonos extra para ti por haber estado conmigo hasta ahora...'
    },
    {
        id: 43,
        type: 'redirect',
        content: '✅ ¡QUIERO COMENZAR MI TRANSFORMACIÓN!',
        redirectUrl: 'https://pay.hotmart.com/J103247898C?checkoutMode=10'
    }
];
