/**
 * ملف JavaScript للإشعارات والتنبيهات
 * يتضمن وظائف التعامل مع الإشعارات باستخدام مكتبة iziToast
 * يمكن استخدامه في مختلف صفحات التطبيق
 */

// تهيئة إعدادات iziToast العامة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الإعدادات الافتراضية لـ iziToast
    iziToast.settings({
        rtl: true,
        position: 'topRight',
        timeout: 5000,
        resetOnHover: true,
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
        displayMode: 'replace'
    });

    // تهيئة مستمعات الأحداث للأزرار إذا كانت موجودة في الصفحة الحالية
    initializeEventListeners();
});

/**
 * تهيئة مستمعات الأحداث للأزرار في النموذج
 * يمكن تخصيص هذه الدالة حسب احتياجات كل صفحة
 */
function initializeEventListeners() {
    // زر إعادة تعيين النموذج
    const resetButton = document.getElementById('reset-category-btn');
    if (resetButton) {
        resetButton.addEventListener('click', handleFormReset);
    }
    
    // زر حفظ التصنيف
    const saveButton = document.getElementById('save-category-btn');
    if (saveButton) {
        saveButton.addEventListener('click', handleFormSubmit);
    }

    // زر الإلغاء
    const cancelButton = document.querySelector('.btn-secondary');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            showConfirmationToast('هل أنت متأكد من إلغاء العملية؟', function() {
                // يمكن إضافة كود للعودة للصفحة السابقة هنا
                showInfoToast('تم إلغاء العملية');
            });
        });
    }
}

/**
 * معالجة حدث إعادة تعيين النموذج
 */
function handleFormReset() {
    const form = document.getElementById('category-form');
    if (form) {
        form.reset();
        showInfoToast('تم إعادة تعيين النموذج');
    }
}

/**
 * معالجة حدث تقديم النموذج
 * يمكن تخصيص هذه الدالة حسب احتياجات كل نموذج
 */
function handleFormSubmit() {
    const form = document.getElementById('category-form');
    if (!form) return;
    
    // التحقق من صحة النموذج
    if (validateForm(form)) {
        // محاكاة إرسال البيانات إلى الخادم
        simulateServerRequest()
            .then(() => {
                showSuccessToast('تم حفظ البيانات بنجاح!');
            })
            .catch(() => {
                showErrorToast('حدث خطأ أثناء حفظ البيانات، يرجى المحاولة مرة أخرى');
            });
    } else {
        showErrorToast('يرجى ملء جميع الحقول المطلوبة');
    }
}

/**
 * التحقق من صحة النموذج
 * @param {HTMLFormElement} form - نموذج HTML للتحقق منه
 * @returns {boolean} - نتيجة التحقق من صحة النموذج
 */
function validateForm(form) {
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    return true;
}

/**
 * محاكاة طلب إلى الخادم (للعرض التوضيحي فقط)
 * @returns {Promise} - وعد يتم حله بعد فترة زمنية قصيرة
 */
function simulateServerRequest() {
    return new Promise((resolve) => {
        // محاكاة تأخير الشبكة
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

// دوال مساعدة لعرض الإشعارات المختلفة باستخدام iziToast

/**
 * عرض إشعار نجاح
 * @param {string} message - نص الرسالة
 */
function showSuccessToast(message) {
    iziToast.success({
        title: 'تم',
        message: message,
        icon: 'fas fa-check-circle'
    });
}

/**
 * عرض إشعار خطأ
 * @param {string} message - نص الرسالة
 */
function showErrorToast(message) {
    iziToast.error({
        title: 'خطأ',
        message: message,
        icon: 'fas fa-exclamation-triangle'
    });
}

/**
 * عرض إشعار معلومات
 * @param {string} message - نص الرسالة
 */
function showInfoToast(message) {
    iziToast.info({
        title: 'تنبيه',
        message: message,
        icon: 'fas fa-info-circle'
    });
}

/**
 * عرض إشعار تحذير
 * @param {string} message - نص الرسالة
 */
function showWarningToast(message) {
    iziToast.warning({
        title: 'تحذير',
        message: message,
        icon: 'fas fa-exclamation-circle'
    });
}

/**
 * عرض إشعار تأكيد مع أزرار
 * @param {string} message - نص الرسالة
 * @param {Function} onConfirm - دالة يتم استدعاؤها عند التأكيد
 */
function showConfirmationToast(message, onConfirm) {
    iziToast.question({
        title: 'تأكيد',
        message: message,
        timeout: 10000,
        close: false,
        overlay: true,
        displayMode: 'once',
        id: 'question',
        zindex: 999,
        buttons: [
            ['<button><b>نعم</b></button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                if (typeof onConfirm === 'function') {
                    onConfirm();
                }
            }, true],
            ['<button>إلغاء</button>', function (instance, toast) {
                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
            }]
        ]
    });
}