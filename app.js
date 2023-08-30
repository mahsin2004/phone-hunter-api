const phonesLoad = async(searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // if search results greater then 9 showing show all button else hidden;
    const showBtn = document.getElementById('show-all');
    if (phones.length > 9 && !isShowAll) {
        showBtn.classList.remove('hidden');
    } else {
        showBtn.classList.add('hidden');
    }
    // show all result showing in display
    if (!isShowAll) {
        // show first 9 result showing in display
        phones = phones.slice(0, 9);
    }
    // Card Container
    const phonesContainer = document.getElementById('phones-container');
    // Search phone result clear
    phonesContainer.innerHTML = '';

    //Dynamically Loading card using loadPhones fatch api Function;
    phones.forEach(phone => {
        const phonesCard = document.createElement('div');
        phonesCard.classList = 'card w-62 bg-base-100 shadow-xl hover:drop-shadow-2xl';
        phonesCard.innerHTML = `
        <div class="bg-[#0d6efd0d] mx-5 mt-5 rounded-lg">
            <figure><img class="max-w-[214] p-12" src="${phone.image}" /></figure>
        </div>
        <div class="card-body">
            <h1 class="text-2xl font-semibold text-center text-slate-800">${phone.brand}</h1>
            <h2 class="card-title text-2xl font-bold mx-auto">${phone.phone_name}</h2>
            <p class="text-[#706F6F] text-center max-w[291px]">${phone.slug}</p>
            <p class="text-[#403F3F] text-2xl font-bold mx-auto">$999</p>
            <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="bg-[#0D6EFD] px-12 py-2.5  rounded-lg text-xl font-medium text-white">Show Details</button>
            </div>
        </div>
        `
        phonesContainer.appendChild(phonesCard);
    })

    loadingSpinner(false)
}

// search input value 
const handleSearch = (isShowAll) => {
        const searchFiled = document.getElementById('search-field');
        const searchText = searchFiled.value;
        loadingSpinner(true)
        phonesLoad(searchText, isShowAll)
    }
    // loading spinner
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// all product show
const handleShowAll = () => {
    handleSearch(true);
}


//show details button
const showDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phones1 = data.data;
    showPhoneDetails(phones1)
}

//showing modal Information
const showPhoneDetails = (phones1) => {
        console.log(phones1);
        const imageContainer = document.getElementById('image-container');
        imageContainer.innerHTML = `
        <figure><img class="mx-auto p-8" src="${phones1.image}" /></figure>
        `
        const infoContainer = document.getElementById('information-area');
        infoContainer.innerHTML = `
        <h1 class="text-2xl font-semibold text-center text-slate-800 mt-5">Iphone 13 Pro Max</h1>
        <h2 class="card-title text-2xl font-bold mx-auto"></h2>
        <p class="text-[#706F6F] text-justify max-w[291px]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">Storage: <span class="text-[#a5a4a4] text-base font-medium">${phones1.mainFeatures.storage}</span></p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">Display Size: <span class="text-[#a5a4a4] text-base font-medium">${phones1.mainFeatures.displaySize}</span></p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">Chipset: <span class="text-[#a5a4a4] text-base font-medium">${phones1.mainFeatures.chipSet}</span></p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">Memory: <span class="text-[#a5a4a4] text-base font-medium">${phones1.mainFeatures.memory}</span></p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">Release data: <span class="text-[#a5a4a4] text-base font-medium">${phones1.releaseDate}</span></p>
        <p class="text-[#403F3F] text-xl font-semibold text-left">GPS: <span class="text-[#a5a4a4] text-base font-medium">${phones1.others.GPS}</span></p>
        `
            // adding Modal
        show_details_modal.showModal();
    }
    //phonesLoad function calling default searchText = "13" phones always show the page.
phonesLoad();