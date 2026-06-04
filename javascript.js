  (function(){
    // Loader con animación
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) loader.style.display = 'none';
      }, 1500);
    });

    // Partículas
    const particlesContainer = document.getElementById('particlesContainer');
    for(let i=0; i<70; i++){
      let p = document.createElement('div');
      p.classList.add('particle');
      let size = Math.random() * 6 + 2;
      p.style.width = size+'px';
      p.style.height = size+'px';
      p.style.left = Math.random()*100+'%';
      p.style.animationDuration = Math.random()*12+8+'s';
      p.style.animationDelay = Math.random()*5+'s';
      particlesContainer.appendChild(p);
    }

    // Menú hamburguesa
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');
    const closeMenu = document.getElementById('closeMenu');
    function toggleMenu(){ navLinks.classList.toggle('active'); }
    menuIcon?.addEventListener('click', toggleMenu);
    closeMenu?.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

    document.getElementById('scrollToAgendar')?.addEventListener('click',()=>{document.getElementById('agendar').scrollIntoView({behavior:'smooth'}); navLinks.classList.remove('active');});
    document.getElementById('scrollToGaleria')?.addEventListener('click',()=>{document.getElementById('galeria').scrollIntoView({behavior:'smooth'}); navLinks.classList.remove('active');});

    // ADMIN desde menú hamburguesa con contraseña
    const adminMenuBtn = document.getElementById('adminMenuBtn');
    const adminPanel = document.getElementById('adminPanel');
    adminMenuBtn?.addEventListener('click', () => {
      navLinks.classList.remove('active');
      let pass = prompt("Ingrese contraseña de administrador:");
      if(pass === "Gisel+Belleza*2026") {
        adminPanel.style.display = 'block';
        document.getElementById('agendar').scrollIntoView({behavior:'smooth'});
      } else if(pass !== null) alert("Acceso denegado");
    });

    // Galería igual
    const imagesDB = [
      
      ];
    let currentFilter = 'all';
    function renderGallery() {
      const filtered = currentFilter === 'all' ? imagesDB : imagesDB.filter(img => img.cat === currentFilter);
      const galleryDiv = document.getElementById('galleryContainer');
      galleryDiv.innerHTML = filtered.map(img => `<div class="gallery-item" data-img="${img.url}"><img src="${img.url}" alt="${img.title}" loading="lazy"><div style="padding:5px; font-size:12px;">${img.title}</div></div>`).join('');
      document.querySelectorAll('.gallery-item').forEach(el => el.addEventListener('click', function() { 
        const imgSrc = this.querySelector('img')?.src; 
        if(imgSrc) { document.getElementById('modalImg').src = imgSrc; document.getElementById('imageModal').style.display='flex'; }
      }));
    }
    function setupFilters(){
      const cats = ['all','semi','moradas','elegantes','francesas','decoradas','cabello'];
      const container = document.getElementById('filterButtons');
      container.innerHTML = cats.map(cat => `<button class="filter-btn ${cat === currentFilter ? 'active' : ''}" data-cat="${cat}">${cat.toUpperCase()}</button>`).join('');
      document.querySelectorAll('.filter-btn').forEach(btn => btn.addEventListener('click', (e) => {
        currentFilter = e.target.dataset.cat;
        renderGallery(); setupFilters();
      }));
    }
    renderGallery(); setupFilters();
    // Modal imagen
    const modal = document.getElementById('imageModal');
    document.querySelector('.close-modal').addEventListener('click',()=>modal.style.display='none');
    modal.addEventListener('click',(e)=>{if(e.target===modal) modal.style.display='none';});

    // Testimonios
    const testimonials = [
      
     
      { name: "Laura Sofía Martínez Torres", text: "Quedé encantada con mi manicura. El acabado fue impecable, muy delicado y duradero. Además, el servicio fue muy amable y profesional. Sin duda volveré.", stars: 5, img: "https://randomuser.me/api/portraits/women/68.jpg" },
      { name: "Daniela C. Rodríguez", text: "Excelente atención. Mis uñas quedaron hermosas y perfectamente arregladas. El planchado fue realizado con mucho cuidado y precisión. Recomiendo este servicio al 100%.", stars: 5, img: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Camila Sánchez López", text: "Profesionalismo, puntualidad y un resultado impecable. La manicura tradicional quedó muy natural y elegante. Recomiendo totalmente este servicio", stars: 5, img: "img/mujer/christinash.jpg" },
      { name: "Juliana Paola Hernández", text: "Servicio de excelente calidad. El planchado me encanto y quedaron mis uñas suaves, brillantes y muy bien presentadas. Estoy muy satisfecha con el resultado", stars: 5, img :"img/mujer/christina.jpg " },
      { name: "Natalia Alejandra Moreno Vargas", text: "Servicio de excelente calidad. El planchado dejó mis uñas suaves, brillantes y muy bien presentadas. Estoy muy satisfecha con el resultado", stars: 5, img: "img/mujer/jonathan.jpg" },
      { name: "Alba Cecilia Viloria", text: "Me fascinó la dedicación y el cuidado de mi pelo durante todo el proceso. Tambien de mis uñas ahora mis manos lucen hermosas y muy bien arregladas. Excelente trabajo", stars: 5, img: "img/mujer/tamara.jpg" },
      { name: "María López", text: "Excelente servicio, mis uñas impecables", stars: 5, img: "img/mujer/hale.jpg" },
      { name: "Valentina Reyes.", text: "Planchado perfecto y atención de lujo", stars: 5, img: "img/mujer/dmytro.jpg" },
      { name: "Camila Galindo", text: "Siempre me voy enamorada de mis uñas, recomendado 100%", stars: 5, img: "https://randomuser.me/api/portraits/women/22.jpg" },
    
    ];
    let currentTesti = 0;
    function buildTestimonials(){
      const track = document.getElementById('testimonialTrack');
      track.innerHTML = testimonials.map(t => `<div class="testimonial-card"><img src="${t.img}" alt="${t.name}"><h4>${t.name}</h4><div class="stars">${'<i class="fas fa-star"></i>'.repeat(t.stars)}</div><p>${t.text}</p></div>`).join('');
      setInterval(() => { currentTesti = (currentTesti+1)%testimonials.length; track.style.transform = `translateX(-${currentTesti*100}%)`; }, 4000);
    }
    buildTestimonials();

    // Citas LocalStorage y envío WhatsApp
    let citas = JSON.parse(localStorage.getItem('giselCitas')) || [];
    function saveCitas(){ localStorage.setItem('giselCitas', JSON.stringify(citas)); renderCitasTable(); }
    
    function renderCitasTable(){ 
      const tbody = document.getElementById('citasTbody');
      if(!tbody) return;
      tbody.innerHTML = citas.map((c,idx) => `<tr><td>${c.nombre}</td><td>${c.celular}</td><td>${c.servicio}</td><td>${c.fecha}</td><td>${c.hora}</td><td><button class="delete-btn" data-idx="${idx}">Eliminar</button></td></tr>`).join('');
      document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => { const idx = e.target.dataset.idx; citas.splice(idx,1); saveCitas(); }));
    }
    
    // Función para enviar WhatsApp automático
    function enviarWhatsApp(citaData) {
      // Mensaje para el profesional (Gisel)
      const mensajeProfesional = `*NUEVA CITA AGENDADA*%0A%0A` +
        `*Cliente:* ${citaData.nombre}%0A` +
        `*Teléfono:* ${citaData.celular}%0A` +
        `*Dirección:* ${citaData.direccion || 'No especificada'}%0A` +
        `*Barrio:* ${citaData.barrio || 'No especificado'}%0A` +
        `*Servicio:* ${citaData.servicio}%0A` +
        `*Fecha:* ${citaData.fecha}%0A` +
        `*Hora:* ${citaData.hora}%0A` +
        `*Método de pago:* ${citaData.pago}%0A` +
        `*Comentarios:* ${citaData.comentarios || 'Ninguno'}%0A%0A` +
        `*Recordatorio:* Confirmar anticipo de $10.000 para validar la cita.`;

        // Mensaje de confirmación para la cliente
      const mensajeCliente = `Hola ${citaData.nombre},%0A%0A` +
        `¡Tu cita ha sido agendada exitosamente! ✅%0A%0A` +
        `*Detalles de tu cita:*%0A` +
        `📅 Fecha: ${citaData.fecha}%0A` +
        `⏰ Hora: ${citaData.hora}%0A` +
        `💅 Servicio: ${citaData.servicio}%0A%0A` +
        `*Importante:* Para confirmar tu reserva, debes realizar un anticipo de $10.000.%0A%0A` +
        `📌 Por favor, envía el comprobante de pago a este mismo número para validar tu cita.%0A%0A` +
        `¡Gracias por preferir Gisel Daza! 💖✨`;
      
      // Enviar mensaje al profesional (número fijo: 573004615549)
      const urlProfesional = `https://wa.me/573004615549?text=${mensajeProfesional}`;
      window.open(urlProfesional, '_blank');
      
      // Enviar mensaje a la cliente (si el número es válido)
      if(citaData.celular && citaData.celular.length >= 10) {
        let numeroCliente = citaData.celular.replace(/\D/g, '');
        if(numeroCliente.length === 10 && !numeroCliente.startsWith('57')) {
          numeroCliente = '57' + numeroCliente;
        }
        const urlCliente = `https://wa.me/${numeroCliente}?text=${mensajeCliente}`;
        // Abrir en nueva pestaña (puede ser bloqueado por popups, por eso se muestra un alert)
        setTimeout(() => {
          window.open(urlCliente, '_blank');
        }, 500);
      }
    }
    
    document.getElementById('citaForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const nueva = {
        nombre: document.getElementById('nombre').value,
        celular: document.getElementById('celular').value,
        direccion: document.getElementById('direccion').value,
        barrio: document.getElementById('barrio').value,
        servicio: document.getElementById('servicioSelect').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        pago: document.getElementById('pago').value,
        comentarios: document.getElementById('comentarios').value,
      };
      
      if(!nueva.nombre || !nueva.celular || !nueva.servicio || !nueva.fecha || !nueva.hora) {
        alert("Completa todos los campos obligatorios");
        return;
      }
      
      // Guardar en localStorage
      citas.push(nueva);
      saveCitas();
      
      // Enviar mensajes de WhatsApp
      enviarWhatsApp(nueva);
      
      alert("Cita agendada ✅ Se abrirá WhatsApp para confirmar el anticipo de $10.000");
      e.target.reset();
    });
    
    document.getElementById('exportExcelBtn')?.addEventListener('click', () => {
      const wsData = [["Nombre","Celular","Dirección","Barrio","Servicio","Fecha","Hora","Pago","Comentarios"]];
      citas.forEach(c => wsData.push([c.nombre, c.celular, c.direccion, c.barrio, c.servicio, c.fecha, c.hora, c.pago, c.comentarios]));
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Citas");
      XLSX.writeFile(wb, `citas_gisel_${new Date().toISOString().slice(0,10)}.xlsx`);
    });
    
    renderCitasTable();
  })();
