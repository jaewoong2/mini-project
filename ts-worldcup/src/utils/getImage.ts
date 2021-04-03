const IMAGES = [
    `https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg`,
    `https://www.foodiesfeed.com/wp-content/uploads/2021/01/espresso-in-coffee-house-463x617.jpg`,
    `https://www.foodiesfeed.com/wp-content/uploads/2020/12/lightly-roasted-coffee-beans-close-up-463x309.jpg`,
    `https://www.foodiesfeed.com/wp-content/uploads/2020/08/omelette-with-freshly-baked-pastry-in-a-cafe-1-463x347.jpg`,
    `https://www.foodiesfeed.com/wp-content/uploads/2020/08/detail-of-pavlova-strawberry-piece-of-cake-463x617.jpg`,
    `https://www.foodiesfeed.com/wp-content/uploads/2020/04/chocolate-waffles-and-coffee-463x695.jpg`,
    `https://media.istockphoto.com/photos/an-asian-chinese-male-working-at-home-using-laptop-video-conference-picture-id1221598194?b=1&k=6&m=1221598194&s=170667a&w=0&h=VnMTc_S8CxP1k8pZzF3R0rwtLheSuASmQWZ30-qPy10=`,
    `https://www.foodiesfeed.com/wp-content/uploads/2019/05/coffee-talk-463x309.jpg`,
]

export default function (idx: number) {
    return IMAGES[idx % 8];
}