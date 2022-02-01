// Categories 
const categories = [
    {
        id: 1,
        name: 'Café',
        icon: 'coffee',
    },
    {
        id: 2,
        name: 'Restaurant',
        icon: 'utensils',
    },
    {
        id: 3,
        name: 'Fast Food',
        icon: 'hamburger',
    },
    {
        id: 4,
        name: 'Bar',
        icon: 'glass-martini-alt',
    },
    {
        id: 5,
        name: 'Hôtel',
        icon: 'hotel',
    },
    {
        id: 6,
        name: 'Kiosque',
        icon: 'gas-pump',
    },
    {
        id: 6,
        name: 'Hôpital',
        icon: 'hospital',
    }
]

const popularPlaces = [
    {
        id: 1,
        name: 'Les Berges Du Lac II',
        category: 'cité',
        location: {
            lon: 36.8468986,
            lat: 10.2641808,
            label: 'Tunis, La Tunisie',
        },
        picture: 'https://i.pinimg.com/originals/29/ef/bc/29efbc8a97b27d496956f28092d11ef1.jpg',
    },
    {
        id: 2,
        name: 'Cité Ennasr',
        category: 'cité',
        location: {
            lon: 36.8468986,
            lat: 10.2641808,
            label: 'Ariana, La Tunisie',
        },
        picture: 'https://i.ytimg.com/vi/ZM4rlSUCdqs/maxresdefault.jpg',
    },
    {
        id: 3,
        name: 'El Aouina',
        category: 'cité',
        location: {
            lon: 36.8633466,
            lat: 10.1513242,
            label: 'Tunis, La Tunisie',
        },
        picture: 'https://www.wepostmag.com/wp-content/uploads/2019/04/56800769_375177893085331_1987120581463506944_n.jpg',
    }
]

const nearestPlaces = [
    {
        id: 1,
        name: 'Café Resto Le 716',
        category: 'Café / Restaurant',
        location: {
            lon: 36.8468986,
            lat: 10.2641808,
        },
        picture: 'https://tunisie.co/uploads/images/content/716-181217-14.jpg',
    },
    {
        id: 2,
        name: 'Happy Batbout',
        category: 'Fast Food',
        location: {
            lon: 36.8468986,
            lat: 10.2641808,
        },
        picture: 'https://scontent.ftun9-1.fna.fbcdn.net/v/t1.6435-9/p180x540/104168483_165422215018428_3506620285473081532_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=m8whDt_xgXMAX9RsrEd&_nc_ht=scontent.ftun9-1.fna&oh=46c32cc33c2835b6d57483ba13fdd1d6&oe=61968913',
    },
    {
        id: 3,
        name: 'Chili\'s Lac 2',
        category: 'Café / Restaurant',
        location: {
            lon: 36.8633466,
            lat: 10.1513242,
        },
        picture: 'http://kapitalis.com/tunisie/wp-content/uploads/2016/07/Chilis.jpg',
    }
]

export {
    categories,
    popularPlaces,
    nearestPlaces
}