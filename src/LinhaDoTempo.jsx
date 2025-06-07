import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LinhaDoTempo({ onBgChange }) {
  const containerRef = useRef();
  const elementosRef = useRef([]);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      const scrollStep = 1;
      const delay = 15;
      const scrollInterval = setInterval(() => {
        if (
          scrollContainer.scrollTop + scrollContainer.clientHeight <
          scrollContainer.scrollHeight
        ) {
          scrollContainer.scrollTop += scrollStep;
        } else {
          clearInterval(scrollInterval);
        }
      }, delay);
      return () => clearInterval(scrollInterval);
    }
  }, []);

  const momentos = [
    {
      data: '01/06/2024',
      titulo: 'Nosso Começo',
      descricao:
        'O Ano que tudo mudou. Nosso primeiro beijo, nossos olhares se cruzando com aquele frio na barriga...',
      imagem: '/img.png',
      bg: 'img.png',
    },
    {
      titulo: 'Nosso Primeiro Dia dos Namorados',
      descricao:
        'Flores, sorrisos e uma playlist que tocava direto no coração. Um dia pra nunca esquecer.',
      imagem: '/img1.png',
      bg: '/img1.png',
    },
    {
      titulo: '💑 1 Ano juntos 💑',
      descricao:
        'Completamos 1 ano juntos. Tantas memórias lindas, risadas, abraços e planos pro futuro 💖',
      imagem: '/2.png',
      bg: '/2.png',
    },
    {
      
      titulo: ' 💖 1 Ano juntos 💖',
      descricao:
        ' Tão simples, tão nosso. Foi aí que entendi o que é sentir saudade mesmo estando perto.” ',
      imagem: '/3.png',
      bg: '/3.png',
    },
    {
      
      titulo: '💑 1 Ano juntos 🥰 ',
      descricao:
        ' Nem tudo saiu como o planejado. Saiu melhor. ',
      imagem: '/4.png',
      bg: '/4.png',
    },
    {
      
      titulo: ' 🥰 😘',
      descricao:
        '',
      imagem: '/5.png',
      bg: '/5.png',
    },
    {
      
      titulo: '🤭 🥰 😘',
      descricao:
        '',
      imagem: '/6.png',
      bg: '/6.png',
    },
    {
      
      titulo: '💖',
      descricao:
        '',
      imagem: '/7.png',
      bg: '/7.png',
    },
    {
      titulo: '💘 💞💭',
      descricao:
        '',
      imagem: '/8.png',
      bg: '/8.png',
    },
    {
      titulo: '🤭💘 💞',
      descricao:
        '',
      imagem: '/9.png',
      bg: '/9.png',
    },
    {
      titulo: '💖💘 💞',
      descricao:
        '',
      imagem: '/10.jpeg',
      bg: '/10.jpeg',
    },
    {
      titulo: '😍',
      descricao:
        '',
      imagem: '/11.jpeg',
      bg: '/11.jpeg',
    },
    {
      titulo: '💖✨ 🤍',
      descricao:
        '',
      imagem: '/12.png',
      bg: '/12.png',
    },
    {
      titulo: '🌹 🌺',
      descricao:
        '',
      imagem: '/13.jpeg',
      bg: '/13.jpeg',
    },
    {
      titulo: '🔟💘 🔟💞',
      descricao:
        '',
      imagem: '/14.jpeg',
      bg: '/14.jpeg',
    },
    {
      titulo: '3️⃣😘🔟✨ 3️⃣🤍',
      descricao:
        '',
      imagem: '/15.jpeg',
      bg: '/15.jpeg',
    },
    {
      titulo: '🌟',
      descricao:
        '',
      imagem: '/16.png',
      bg: '/16.png',
    },
    {
      titulo: '3️⃣💌',
      descricao:
        '',
      imagem: '/17.jpeg',
      bg: '/17.jpeg',
    },
      {
      titulo: '  💖  💖    TE AMO   💖  💖  ',
      imagem: '/18.jpeg',
      bg: '/18.jpeg',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            onBgChange(momentos[index].bg);
          }
        });
      },
      {
        threshold: 0.6,
        root: containerRef.current,
      }
    );

    elementosRef.current.forEach((el) => el && observer.observe(el));

    return () => {
      elementosRef.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-h-screen overflow-y-auto max-w-3xl mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Nossa História</h1>
      <div className="space-y-8">
        {momentos.map((momento, index) => (
          <motion.div
            key={index}
            data-index={index}
            ref={(el) => (elementosRef.current[index] = el)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <img
                src={momento.imagem}
                alt={momento.titulo}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{momento.titulo}</h2>
                <p className="text-sm text-gray-500 mb-2">{momento.data}</p>
                <p>{momento.descricao}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
