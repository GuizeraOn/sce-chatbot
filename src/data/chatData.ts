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
        content: '🔥 ¿Quieres <strong>transformar tu cuerpo</strong> sin necesidad de <strong>ir al gimnasio</strong>? 🔥'
    },
    {
        id: 2,
        type: 'text',
        content: 'Si quieres <strong>perder peso</strong>, <strong>ganar músculo</strong> y <strong>mejorar tu salud</strong> con entrenamientos de <span class="elite-highlight">calistenia en casa</span>, tengo algo especial para ti.'
    },
    {
        id: 3,
        type: 'text',
        content: 'En solo <strong>15 minutos al día</strong>, puedes tener <span class="elite-highlight">resultados visibles en 28 días</span>.'
    },
    {
        id: 4,
        type: 'options',
        content: '👉 Antes de mostrarte cómo, cuéntame: <strong>¿cuál es tu mayor desafío hoy?</strong>',
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
        content: '¡Perfecto! Cuéntame, <strong>¿qué edad tienes?</strong>',
        variable: 'age',
        placeholder: 'Escribe tu edad...'
    },
    {
        id: 6,
        type: 'options',
        content: '¡Genial! <strong>¿Y ya has intentado entrenamientos de calistenia antes?</strong>',
        options: [
            { label: 'Sí', value: 'Sí' },
            { label: 'No', value: 'No' }
        ]
    },
    {
        id: 7,
        type: 'options',
        content: 'Entendido. <strong>¿Y cuál es tu objetivo principal hoy?</strong>',
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
        content: '¡Bien! <strong>¿Cómo describirías tu físico actual?</strong>',
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
        content: '<strong>¿Y cuál sería tu "cuerpo soñado"?</strong>',
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
        content: '¡Perfecto, vamos a armar un <span class="elite-highlight">plan exclusivo para ti</span>, <strong>amigo</strong>!'
    },
    {
        id: 11,
        type: 'input-text',
        content: 'Pero antes, dime, <strong>¿cuál es tu nombre?</strong>',
        variable: 'nome',
        placeholder: 'Escribe tu nombre...'
    },
    {
        id: 12,
        type: 'options',
        content: '<strong>¿Cómo funciona tu metabolismo?</strong>',
        options: [
            { label: 'Gano peso rápidamente, pero lo pierdo lentamente', value: 'Gano peso rápidamente, pero lo pierdo lentamente' },
            { label: 'Me cuesta ganar peso o músculo', value: 'Me cuesta ganar peso o músculo' },
            { label: 'Gano o pierdo peso fácilmente', value: 'Gano o pierdo peso fácilmente' }
        ]
    },
    {
        id: 13,
        type: 'options',
        content: '{{nome}}, <strong>¿hace cuánto tiempo estuviste en la mejor forma física de tu vida?</strong>',
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
        content: '{{nome}}, ya casi termino, solo respóndeme unas preguntitas más, por favor. <strong>¿Qué zona del cuerpo te gustaría trabajar primero?</strong>',
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
        content: '<strong>¿Sueles hacer bastante ejercicio físico?</strong>',
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
        content: 'Entendido {{nome}}, cuéntame, <strong>¿cómo describirías tu día a día?</strong>',
        options: [
            { label: 'Paso la mayor parte del día sentado', value: 'Paso la mayor parte del día sentado' },
            { label: 'Hago pausas activas', value: 'Hago pausas activas' },
            { label: 'Estoy de pie todo el día', value: 'Estoy de pie todo el día' }
        ]
    },
    {
        id: 17,
        type: 'options',
        content: '<strong>¿Cuántas horas sueles dormir por noche?</strong>',
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
        content: '<strong>¿Cuál es tu principal motivo para ponerte en forma?</strong>',
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
        content: '¡Perfecto {{nome}}! Dime, <strong>¿cuál es tu peso actual en kg?</strong>',
        variable: 'current_weight',
        placeholder: 'Ej: 75'
    },
    {
        id: 20,
        type: 'input-number',
        content: '¡Entendido! <strong>¿Y cuál es el peso que quieres alcanzar en kg?</strong>',
        variable: 'peso desejado',
        placeholder: 'Ej: 70'
    },
    {
        id: 21,
        type: 'text',
        content: '{{nome}}, estoy <strong>terminando de armar tu plan de entrenamiento de calistenia</strong>. Mientras tanto, déjame mostrarte los resultados de algunos alumnos que hicieron el entrenamiento...'
    },
    {
        id: 22,
        type: 'text',
        content: 'Mira el resultado de <strong>Martín, de 53 años</strong>, que aun comiendo lo que le gusta, logró <strong>perder 17 kg</strong> y consiguió librarse del <strong>dolor de espalda</strong> que lo atormentaba todos los días...'
    },
    {
        id: 23,
        type: 'image',
        content: 'https://i.ibb.co/3yT63khC/th5fa86340e6wg5xilbv75wb.jpg'
    },
    {
        id: 24,
        type: 'text',
        content: 'Y <strong>Marcelo, de 37 años</strong>. Fue su esposa Valeria quien me buscó y me dijo que él tenía muchos dolores en las articulaciones. Con solo <strong>40 minutos al día</strong>, él terminó <strong>perdiendo 7 kg</strong> y conquistó este <span class="elite-highlight">resultado increíble</span>...'
    },
    {
        id: 25,
        type: 'image',
        content: 'https://i.ibb.co/PGXjkd6b/40ecccba17e2dbdd5b9cfb6d91d62a5e.jpg'
    },
    {
        id: 26,
        type: 'options',
        content: '{{nome}}, <strong>¿te gustaría tener resultados increíbles como los que ellos tuvieron?</strong>',
        options: [
            { label: '👍 ¡SÍ, YO QUIERO!', value: '👍 ¡SÍ, YO QUIERO!' }
        ]
    },
    {
        id: 27,
        type: 'text',
        content: '<strong>¿Sabes qué tienen todos ellos en común?</strong>'
    },
    {
        id: 28,
        type: 'text',
        content: 'Siguieron el <span class="elite-highlight">Plan de Entrenamientos personalizado</span> que hice para cada uno de ellos y para más de 3500 hombres en los últimos dos años.'
    },
    {
        id: 29,
        type: 'text',
        content: 'Pero ahora, déjame explicarte cómo funciona... Recibirás <strong>entrenamientos personalizados</strong> en video-clases exclusivamente para ti, <strong>¡todos los días!</strong>'
    },
    {
        id: 30,
        type: 'text',
        content: 'Ejercicios que puedes hacer en casa, <strong>sin ningún equipo</strong>:'
    },
    {
        id: 31,
        type: 'text',
        content: '✅ <strong>Pérdida de peso</strong>\n✅ <strong>Ganancia de masa magra</strong>\n✅ <strong>Alivio de dolores de espalda</strong>\n✅ <strong>Mejora de la postura</strong>\n✅ <strong>Aumento de testosterona</strong>\n✅ <strong>Aumento de la libido</strong>\n✅ <strong>Mejora de la flexibilidad</strong>\n✅ Se puede hacer en casa\n✅ <strong>Sin aparatos</strong>, no necesitas comprar NADA.'
    },
    {
        id: 32,
        type: 'options',
        content: '{{nome}}, <strong>¿estás preparado para esta transformación en tu vida?</strong>',
        options: [
            { label: '¡SÍ, ACEPTO EL DESAFÍO!', value: '¡SÍ, ACEPTO EL DESAFÍO!' }
        ]
    },
    {
        id: 33,
        type: 'text',
        content: '{{nome}}, ¡tu <strong>Plan de entrenamiento de calistenia para {{motivo selecionado}}</strong> está listo!'
    },
    {
        id: 34,
        type: 'text',
        content: 'De acuerdo con la información que me diste, la previsión es que estarás con <strong>{{peso desejado}} kg</strong> para el <span class="elite-highlight">{{target_date}}</span>.'
    },
    {
        id: 35,
        type: 'chart',
        content: ''
    },
    {
        id: 36,
        type: 'options',
        content: '<strong>¿Estás preparado para esta transformación?</strong>',
        options: [
            { label: '¡SÍ, ESTOY PREPARADO!', value: '¡SÍ, ESTOY PREPARADO!' }
        ]
    },
    {
        id: 37,
        type: 'text',
        content: '{{nome}}, no me gusta ver que una mensualidad de calistenia en gimnasios de tu país pueda llegar a costar unos <strong>$40 USD al mes</strong>. ¡Sin contar nutriólogos y entrenadores personales! Me parece una locura...'
    },
    {
        id: 38,
        type: 'text',
        content: 'Por eso quiero ofrecerte esto sin ningún costo de mensualidad. Sí, es eso mismo, el acompañamiento es <strong>totalmente gratuito</strong>.'
    },
    {
        id: 39,
        type: 'text',
        content: 'Pero, para mantener todo funcionando y garantizar que tengas la mejor experiencia, cobramos una pequeña cuota de inscripción ÚNICA de SOLO <span class="elite-highlight">$9 USD</span>. Es el valor que la Plataforma me cobra para hospedar las clases de los entrenamientos.'
    },
    {
        id: 40,
        type: 'text',
        content: 'Esta pequeña contribución me ayuda a mantener todo esto vivo, a continuar apoyando y transformando la vida de tantos hombres. Y es también una forma de sellar nuestro compromiso juntos. <strong>¡Pagas solo 1 vez y tienes acceso para siempre con todas las actualizaciones y nuevos entrenamientos!</strong>'
    },
    {
        id: 41,
        type: 'text',
        content: '{{nome}}, además, si en un plazo de 90 días sientes que no estás viendo el cambio que esperabas, te prometo que <span class="elite-highlight">te devuelvo cada centavo</span>.'
    },
    {
        id: 42,
        type: 'text',
        content: 'Cuando finalices el pago, voy a liberar <span class="elite-highlight">3 bonos extra</span> para ti por haber estado conmigo hasta ahora...'
    },
    {
        id: 43,
        type: 'redirect',
        content: '✅ ¡QUIERO COMENZAR MI TRANSFORMACIÓN!',
        redirectUrl: 'https://pay.hotmart.com/J103247898C?checkoutMode=10'
    }
];
