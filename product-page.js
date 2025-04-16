// وظائف إضافة الاختيارات والإضافات
document.addEventListener('DOMContentLoaded', function() {
    // إضافة اختيار جديد
    document.getElementById('add-option-btn').addEventListener('click', function() {
        const optionsContainer = document.getElementById('options-container');
        const optionId = 'option-' + Date.now();
        
        const optionHTML = `
            <div class="option-card mb-3 fade-in" id="${optionId}">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-2 mb-md-0">
                        <select class="form-select option-select">
                            <option value="" selected disabled>اختر العنصر</option>
                            <option value="size">الحجم</option>
                            <option value="spice">مستوى الحرارة</option>
                            <option value="cooking">طريقة الطهي</option>
                            <option value="bread">نوع الخبز</option>
                            <option value="sauce">الصلصة</option>
                        </select>
                    </div>
                    <div class="col-md-5 mb-2 mb-md-0">
                        <div class="input-group">
                            <input type="number" class="form-control option-price" min="0" step="0.01" placeholder="السعر الإضافي">
                            <span class="input-group-text">ريال</span>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <button type="button" class="btn btn-outline-danger delete-option-btn" data-option-id="${optionId}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
        
        // إضافة مستمع حدث لزر الحذف
        document.querySelector(`#${optionId} .delete-option-btn`).addEventListener('click', function() {
            document.getElementById(optionId).remove();
        });
    });
    
    // إضافة عنصر جديد (إضافة)
    document.getElementById('add-addon-btn').addEventListener('click', function() {
        const addonsContainer = document.getElementById('addons-container');
        const addonId = 'addon-' + Date.now();
        
        const addonHTML = `
            <div class="option-card mb-3 fade-in" id="${addonId}">
                <div class="row align-items-center">
                    <div class="col-md-5 mb-2 mb-md-0">
                        <select class="form-select addon-select">
                            <option value="" selected disabled>اختر الإضافة</option>
                            <option value="cheese">جبنة إضافية</option>
                            <option value="sauce">صلصة إضافية</option>
                            <option value="meat">لحم إضافي</option>
                            <option value="vegetables">خضروات إضافية</option>
                            <option value="fries">بطاطس</option>
                        </select>
                    </div>
                    <div class="col-md-5 mb-2 mb-md-0">
                        <div class="input-group">
                            <input type="number" class="form-control addon-price" min="0" step="0.01" placeholder="سعر الإضافة">
                            <span class="input-group-text">ريال</span>
                        </div>
                    </div>
                    <div class="col-md-2 text-end">
                        <button type="button" class="btn btn-outline-danger delete-addon-btn" data-addon-id="${addonId}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        addonsContainer.insertAdjacentHTML('beforeend', addonHTML);
        
        // إضافة مستمع حدث لزر الحذف
        document.querySelector(`#${addonId} .delete-addon-btn`).addEventListener('click', function() {
            document.getElementById(addonId).remove();
        });
    });
    
    // إضافة إزالة جديدة
    document.getElementById('add-removal-btn').addEventListener('click', function() {
        const removalsContainer = document.getElementById('removals-container');
        const removalId = 'removal-' + Date.now();
        
        const removalHTML = `
            <div class="removal-card mb-3 fade-in" id="${removalId}">
                <div class="row align-items-center">
                    <div class="col-md-10 mb-2 mb-md-0">
                        <input type="text" class="form-control removal-name" placeholder="اسم العنصر المراد إزالته (مثال: بدون بصل)">
                    </div>
                    <div class="col-md-2 text-end">
                        <button type="button" class="btn btn-outline-danger delete-removal-btn" data-removal-id="${removalId}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        removalsContainer.insertAdjacentHTML('beforeend', removalHTML);
        
        // إضافة مستمع حدث لزر الحذف
        document.querySelector(`#${removalId} .delete-removal-btn`).addEventListener('click', function() {
            document.getElementById(removalId).remove();
        });
    });
    
    // إضافة مسببات الحساسية المحددة
    document.getElementById('allergens-dropdown').addEventListener('click', function(e) {
        e.stopPropagation(); // منع إغلاق القائمة المنسدلة عند النقر عليها
    });
    
    // إضافة مستمع حدث لزر إضافة مسببات الحساسية
    document.getElementById('add-allergens-btn').addEventListener('click', function() {
        const selectedCheckboxes = document.querySelectorAll('.allergen-checkbox:checked');
        const allergensContainer = document.getElementById('selected-allergens-container');
        
        // إضافة كل مسبب حساسية محدد كعنصر منفصل
        selectedCheckboxes.forEach(checkbox => {
            const allergenId = 'allergen-item-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
            const allergenName = checkbox.nextElementSibling.textContent.trim();
            const allergenValue = checkbox.value;
            
            const allergenHTML = `
                <div class="allergen-item mb-2 fade-in" id="${allergenId}">
                    <div class="d-flex align-items-center">
                        <span class="badge bg-info me-2">${allergenName}</span>
                        <button type="button" class="btn btn-sm btn-outline-danger delete-allergen-btn" data-allergen-id="${allergenId}">
                            <i class="fas fa-times"></i>
                        </button>
                        <input type="hidden" name="selected-allergens[]" value="${allergenValue}">
                    </div>
                </div>
            `;
            
            // تحقق مما إذا كان مسبب الحساسية موجود بالفعل
            const existingAllergen = document.querySelector(`input[name="selected-allergens[]"][value="${allergenValue}"]`);
            if (!existingAllergen) {
                allergensContainer.insertAdjacentHTML('beforeend', allergenHTML);
                
                // إضافة مستمع حدث لزر الحذف
                document.querySelector(`#${allergenId} .delete-allergen-btn`).addEventListener('click', function() {
                    document.getElementById(allergenId).remove();
                });
            }
        });
        
        // إغلاق القائمة المنسدلة بعد الإضافة
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const dropdownToggle = document.getElementById('allergens-dropdown');
        dropdownToggle.classList.remove('show');
        dropdownMenu.classList.remove('show');
    });
});