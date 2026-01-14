document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const hackScreen = document.getElementById('hackScreen');
    const surpriseScreen = document.getElementById('surpriseScreen');
    const countdownElement = document.getElementById('countdown');
    const repeatBtn = document.getElementById('repeatBtn');
    const musicBtn = document.getElementById('musicBtn');
    const celebrationAudio = document.getElementById('celebrationAudio');
    
    // المتغيرات
    let countdown = 10;
    let audioPlaying = false;
    
    // عرض الإشعارات الوهمية بالتتابع
    function showFakeNotifications() {
        const notifications = document.querySelectorAll('.notification');
        let delay = 0;
        
        notifications.forEach(notification => {
            setTimeout(() => {
                notification.style.display = 'block';
                
                // إخفاء الإشعار بعد 3 ثواني
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transform = 'translateX(-100%)';
                }, 3000);
            }, delay);
            
            delay += 1500; // زيادة التأخير بين كل إشعار وآخر
        });
    }
    
    // العد التنازلي
    function startCountdown() {
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            
            // تأثيرات خاصة عند العد التنازلي
            if (countdown === 7) {
                countdownElement.style.color = '#ff9900';
                document.body.style.backgroundColor = '#1a0000';
            }
            else if (countdown === 4) {
                countdownElement.style.color = '#ff3300';
                document.body.style.backgroundColor = '#330000';
            }
            else if (countdown === 2) {
                countdownElement.style.color = '#ff0000';
                countdownElement.style.transform = 'scale(1.3)';
                document.body.style.backgroundColor = '#4d0000';
            }
            else if (countdown === 0) {
                clearInterval(countdownInterval);
                
                // الانتقال للشاشة الثانية بعد نصف ثانية
                setTimeout(showSurpriseScreen, 500);
            }
        }, 1000);
    }
    
    // عرض شاشة المفاجئة
    function showSurpriseScreen() {
        // إخفاء شاشة الاختراق
        hackScreen.style.opacity = '0';
        hackScreen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            hackScreen.classList.remove('active');
            hackScreen.style.display = 'none';
            
            // إظهار شاشة المفاجئة
            surpriseScreen.style.display = 'flex';
            surpriseScreen.style.opacity = '0';
            
            setTimeout(() => {
                surpriseScreen.classList.add('active');
                surpriseScreen.style.opacity = '1';
                
                // تشغيل الموسيقى تلقائياً
                playCelebrationMusic();
            }, 100);
        }, 500);
    }
    
    // تشغيل موسيقى الاحتفال
    function playCelebrationMusic() {
        if (!audioPlaying) {
            celebrationAudio.play()
                .then(() => {
                    audioPlaying = true;
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> إيقاف الموسيقى';
                })
                .catch(error => {
                    console.log('تشغيل الموسيقى يحتاج تفاعل المستخدم أولاً');
                    musicBtn.innerHTML = '<i class="fas fa-play"></i> تشغيل الموسيقى';
                });
        }
    }
    
    // إيقاف موسيقى الاحتفال
    function stopCelebrationMusic() {
        if (audioPlaying) {
            celebrationAudio.pause();
            celebrationAudio.currentTime = 0;
            audioPlaying = false;
            musicBtn.innerHTML = '<i class="fas fa-music"></i> موسيقى الفرحة';
        }
    }
    
    // إعادة المقلب من البداية
    function restartPrank() {
        // إعادة تعيين المتغيرات
        countdown = 10;
        countdownElement.textContent = countdown;
        countdownElement.style.color = '#ff0000';
        countdownElement.style.transform = 'scale(1)';
        document.body.style.backgroundColor = '#000';
        
        // إعادة تعيين الإشعارات
        document.querySelectorAll('.notification').forEach(notification => {
            notification.style.display = 'none';
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // إخفاء شاشة المفاجئة
        surpriseScreen.classList.remove('active');
        surpriseScreen.style.opacity = '0';
        
        setTimeout(() => {
            surpriseScreen.style.display = 'none';
            
            // إظهار شاشة الاختراق
            hackScreen.style.display = 'block';
            hackScreen.style.opacity = '0';
            
            setTimeout(() => {
                hackScreen.classList.add('active');
                hackScreen.style.opacity = '1';
                
                // إعادة تشغيل المقلب
                setTimeout(() => {
                    showFakeNotifications();
                    startCountdown();
                }, 1000);
            }, 100);
        }, 500);
        
        // إيقاف الموسيقى إذا كانت تعمل
        stopCelebrationMusic();
    }
    
    // معالجة زر الموسيقى
    musicBtn.addEventListener('click', function() {
        if (audioPlaying) {
            stopCelebrationMusic();
        } else {
            playCelebrationMusic();
        }
    });
    
    // معالجة زر إعادة المقلب
    repeatBtn.addEventListener('click', restartPrank);
    
    // بدء المقلب تلقائياً عند تحميل الصفحة
    setTimeout(() => {
        showFakeNotifications();
        startCountdown();
    }, 2000);
    
    // إضافة تأثيرات إضافية عشوائية خلال العد التنازلي
    setInterval(() => {
        if (hackScreen.classList.contains('active')) {
            // تأثير وميض عشوائي
            if (Math.random() > 0.7) {
                document.body.style.backgroundColor = '#220000';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#000';
                }, 200);
            }
            
            // ظهور رسائل عشوائية في المحاكاة الطرفية
            if (Math.random() > 0.8 && countdown > 3) {
                const terminalBody = document.querySelector('.terminal-body');
                const newLine = document.createElement('div');
                newLine.className = 'terminal-line';
                newLine.textContent = `[${new Date().toLocaleTimeString()}] تم العثور على ملفات مسربة...`;
                terminalBody.appendChild(newLine);
                
                // حذف الرسائل القديمة
                if (terminalBody.children.length > 10) {
                    terminalBody.removeChild(terminalBody.firstChild);
                }
            }
        }
    }, 1000);
});