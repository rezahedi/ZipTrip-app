import PlanCard from "@/Components/Common/PlanCard";
import { Plan } from "@/types";
import React from "react";

const FAKE_DATA: Plan[] = [
  {
    _id: "688bbcf902f49ff7e935e2d3",
    userId: {
      imageURL: "",
      _id: "67fd2f5ebede3059343fae72",
      name: "Reza Zahedi",
    },
    title: "Golden Gate to Chinatown: Your Cultural Tour",
    description:
      "San Francisco is a city of steep hills, sweeping bay views, colorful Victorian houses, and rich culture. This one-day plan is perfect for travelers who want to experience the soul of the city in just a few hours. You'll cross the Golden Gate Bridge, wander the vibrant streets of Chinatown, explore famous landmarks like Alcatraz and Fisherman’s Wharf, and ride a historic cable car through the hills.\n\nAlong the way, you’ll catch unforgettable views, sample local flavors, and discover why San Francisco continues to charm visitors from around the world. Be prepared to walk and dress in layers, SF’s microclimates can surprise you.",
    images: [
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2c4hKRv6923fX9xxqfO4kS9Cm79BLDiHnvr9k88f3tza6Yv_SQTjJgYGH2wZ06Y3NWY-1W7GFrN_S6svhgUJTXSGmx1g5R8o5jL4noukRsoayli9ubkt9SZbs8Htopnd7ksy0JT0EuaOZj_KsmnUkCeWX4F6nXZoTfUsPYNIWZky_zuF9J4b6zoiqBDEuwKlyvRsczqrsXNdMCojp8OgfwP_okw-fOwNDSaxmmDXHkuqXVL744-7NsgmiJ2p0xtVUpWITbzoW7BP7VDgD6EZcvKaxO5aCNzgp4JHzSEMMHu86LWOZFNIlzKWDw0v_WOtjCAEwk__9lhpzMjEAyKzTuqgy_KTkT3iyNznutH2yconyoWzNgErrNBIDpNGKO-fFKcfZDycvGFeW22Mn-gzWEj7AI46Sram6ZF9j0Keg&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F688bbcf902f49ff7e935e2d3&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=115267",
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2cZMpTeKRQbfBMyNkB6JFqZT9Rg_fyIwJjC6XD7emsS0Yfy9kCpUBamvCD9OG1fnXtQvTPda4y_FEuOTSFC7huYXwX9lpnNMiP4qPfy3tBBspiXnHHRPKeQzrOpMzPWg36RNCejplqSbheM8SJWC84o_SKM2I_k3DbtMqgMx0T7bcUgtE-kePv0JbMkVksOBJ0iiH7qxHxkuZzcWrzVcjA5iS7lHnlHH2n8z5q38n6rQhBw9ODxXLNs7NoYx3dPrK6WD9_AJrngSN7XMIY4mIQmJutm4uoxlvveROGJrn3CKkckal67o3_87FqlJvOfC3G6iVbctEhiwQEERoQAsW8qdSdqaeDboxyEmlS9M32FPa04jWovvYigzi6uLdnIzrOSUBXxf0BLfRYRu1Rbm_iI5FQ1F7KIrgaXiEmR_mFKJ0c&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F688bbcf902f49ff7e935e2d3&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=99234",
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2ezkpc6ITVZIl7j-7VNx9hepUffODxKTu2KMyBMFPr0NEnF-wVlMjEC1qO8KyN_yXoxz_kX8Wk3gPEbssn_hWWd16wGUdfvAdWfBCeNY2E1uvT5EBOHdP4Yz-eJHf2lsL7s31XqxZWu77UmQBkU-OEy_A-x2SOy3HbklLWRFmw5BIrPGQJmfrmHVynou3w86nqFuZG3qqC4wXFkTjLPiSvnzLbokrsNPg-B4-v2Dt7g75BjNvJCV3xHfVa8GMlYSq3hlkbY1qyHAMbWxz5buGBxhCLDRuH1_ZIPNcL61_z7oKFRN_wyJUpkNJ3dAdMsP6KCvDgKJhyMbvSTyz9_pCZ-WfWAYLh6816uAL-7l4x3--lv3kG4a6XZ96bxr1BQ8vIpAbLAMAH8DCZ2ZGRj8HAIFhF8k8PFBNINW6f9RKez9g&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F688bbcf902f49ff7e935e2d3&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=86743",
    ],
    stopCount: 7,
    rate: 0,
    reviewCount: 0,
    startLocation: [37.7938363, -122.408787],
    finishLocation: [37.7897395, -122.3961656],
    distance: 12,
    duration: "9",
    categoryId: {
      imageURL: "",
      _id: "681c26c2ecfb15072ea410e9",
      name: "Sightseeing & Attractions",
    },
    createdAt: new Date("2025-07-31T18:59:05.704Z"),
    updatedAt: new Date("2025-09-16T22:40:45.414Z"),
    type: "Full day",
    isBookmarked: false,
  },
  {
    _id: "68142fcbcb6fe45e2bbd30f0",
    userId: {
      imageURL: "",
      _id: "67fd2f5ebede3059343fae72",
      name: "Reza Zahedi",
    },
    title: "A Sunny day tour in Golden Gate Park and Neighborhood",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    images: [
      "https://www.sftravel.com/sites/default/files/styles/hero/public/2022-10/painted-ladies-city-skyline-twilight.jpg.webp?itok=MVU3kPdc",
      "https://cdn.britannica.com/51/178051-050-3B786A55/San-Francisco.jpg",
      "https://www.calacademy.org/sites/default/files/styles/manual_crop_standard_960x540/public/uploads/images/cas22-155-layers-small.jpg?itok=YMp92jP5&c=f14936ae55e8d4293886b19bcfa364bd",
    ],
    type: "Full day",
    stopCount: 6,
    rate: 4.4,
    reviewCount: 269,
    startLocation: [37.7717766, -122.4547685],
    finishLocation: [37.7716753, -122.4783364],
    distance: 8.6,
    duration: "4.5",
    categoryId: {
      imageURL: "",
      _id: "680819f66e7cdbc049ab3f57",
      name: "City Exploration",
    },
    createdAt: new Date("2025-05-02T02:36:59.787Z"),
    updatedAt: new Date("2025-05-13T22:38:22.289Z"),
    isBookmarked: false,
  },
  {
    _id: "68242bd564c6b492688b173a",
    userId: {
      imageURL: "",
      _id: "67fd2f5ebede3059343fae72",
      name: "Reza Zahedi",
    },
    title: "A Day Around Lake Merritt: Nature, Culture & Good Eats",
    description:
      "Lake Merritt is the heart of Oakland, a peaceful urban oasis surrounded by vibrant neighborhoods, unique attractions, and local favorites. This plan is perfect for a chill day of walking, people-watching, tasty bites, and light exploring. Whether you're new to the area or showing friends around, this route offers a slice of everything Oakland has to offer.",
    images: [
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2eEmXunQUDNgeA2bxPjLFOcPtItM-yXotLErOrSGsEjj9P28WJP4T4vhY5xYIYf46qq8tIW3oGznA_y_5-0Mtam67QdHUnrRAInsapESeA2qjAbp55OFh1qYBklRFs-eygJaLRMZo5P6W_iQUzP-RLG1NCt2qgQ1KJdcCxfMgFePE91LrhkTPS0PtJfqk5q29KQwDZ6I187UD8mW50ppEN7O4tdwP7i90Cz5vcFp4w31c4kuLqho9MkhQrxXoV3Iv5TaG4nOUxH9KMlWIqg4ix4X3YUwvv6i1t2F5J9aFu_7MQPZAeXySX_Oy2AyAWoe60Zr0ZEx2Nl1J5MfFrO6KioREs5IPi9MF6aWUmsEPpeD1sgfSf1cRmvB529DY5dB4bswzBrEAo7Zp-Yj-7H4-9EXh2U4k3HK8O8R5aJBadMeR2y&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F68242bd564c6b492688b173a&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=69790",
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2fNQGxL0I3_mnwAMk1Ri6S7IPXDLt_gZ-jmn_HFsRvXXDiI2FjI1g-nxq135I8raySeXnt0x4bvmqXZ_HJkJJnZd3T3OxMKuEaefObSITnXiDTi90caJlE7P7QLvfLRhgAIRXQHJrG5KNct6VU7GU-V-3Fdti6UwTWKJ9jjd1AYD8hj1Y3Lh_DeXqERYraw7H5kAjmf67358zWG_lSKret4QOqOnSYL9c-E0iPuIwv4Vb52bVhyLR17c4uBr2ERBsFBm0FdaPYaeNBfn_oW2Oh1FLB2xfBs5vk3HwQnQoSeXQ&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F68242bd564c6b492688b173a&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=20000",
      "https://reversemortgageresourcecenter.com/wp-content/uploads/2023/05/Childrens-Fairyland-Oakland-California.jpeg",
      "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAciIO2ekBCgBVxGKhj4nvHlsIu5KmGwepygMS89KCqqtImM8vXqJFM9wDTGu4-g8uPm7itlUwujpjobHZCe5OvihKKq31HKXWTqsHyPXqRzPtSL9saYSmkoJKAkMsRrVmTIkF8gdOpa3V4cDrQsWFfF5ZNXoZvLRA-0jvev7mORqSTnQxoPczbB0HXHN7GZsJ66ad0cY97ej5qivIUcUe0018Fncfrcw3Y2ee7q_6AbvWN2L_2Dkb2wgDnoVJvf1ARe4uzvMq27z0X0Qnyl2wy9XWcs9Xi4Ed_wYZPExkReLfa16XhtpNyijLYevWyscMqUak5-N7pSXHyKzO3pimnLJypxrkUCWlBfdWoTlcEZ9nad1CLfIRWl_sEr31M28M9a5lxrHN_p1RReNyrBiAYK8ZUC23k19VyfQiofqLPwum0s&3u400&5m1&2e1&callback=none&r_url=http%3A%2F%2Flocalhost%3A5173%2Faccount%2F68242bd564c6b492688b173a&key=AIzaSyCIPLD2VkadxP93Y9VfggcOTzO-ZoRrEg8&token=26048",
    ],
    type: "Full day",
    stopCount: 6,
    rate: 2.9,
    reviewCount: 95,
    startLocation: [37.80940406629325, -122.25985216557562],
    finishLocation: [37.8098488, -122.2610236],
    distance: 4,
    duration: "5",
    categoryId: {
      imageURL: "",
      _id: "68081c236e7cdbc049ab3f5a",
      name: "Nature Explore",
    },
    createdAt: new Date("2025-05-14T05:36:21.948Z"),
    updatedAt: new Date("2025-09-16T22:33:36.732Z"),
    isBookmarked: false,
  },
];

const SidebarOverlay = ({ plans }: { plans: Plan[] }) => {
  plans = FAKE_DATA;
  return (
    <div className="bg-background p-4 m-3 w-md h-[calc(100vh-170px)] rounded-lg shadow-md flex flex-col">
      <div className="flex justify-between items-center pb-2">
        <h2 className="font-medium text-lg">Explore Plans</h2>
        <span>{plans.length} plans</span>
      </div>
      <div className="flex flex-col gap-4 overflow-y-scroll h-[100] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {plans &&
          plans.map((plan) => (
            <PlanCard key={plan._id} {...plan} image={plan.images[0]} />
          ))}
      </div>
      {!plans.length && <p>There is no plans in this location!</p>}
    </div>
  );
};

export default SidebarOverlay;
