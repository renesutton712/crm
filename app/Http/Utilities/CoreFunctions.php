<?php

namespace App\Http\Utilities;

class CoreFunctions
{
    private $muslimNames = [
        "Zohan",
        "Muhammad",
        "Arham",
        "Aliza",
        "Shazain",
        "Aariz",
        "Nimra",
        "Zaroon",
        "Anabia",
        "Minal",
        "Zaviyar",
        "Harmain",
        "Shazil",
        "Alayna",
        "Samaira",
        "Alisha",
        "Alishba",
        "Azlan",
        "Huzaifa",
        "Hifza",
        "Mahad",
        "Hasnain",
        "Aizah",
        "Affan",
        "Sumaiya",
        "Zaid",
        "Sameer",
        "Shawaiz",
        "Aqsa",
        "Zohaib",
        "Sahil",
        "Rabail",
        "Anayah",
        "Anas",
        "Javeria",
        "Laiba",
        "Taimur",
        "Shayan",
        "Rehan",
        "Arfa",
        "Umaiza",
        "Ziyan",
        "Mohid",
        "Anamta",
        "Mahira",
        "Zeeshan",
        "Fiza",
        "Hamna",
        "Inaya",
        "Arshiya",
        "Muzammil",
        "Noman",
        "Areeba",
        "Ashar",
        "Parvez",
        "Arsh",
        "Tabrez",
        "Shazia",
        "Reshma",
        "Parizad",
        "Zavian",
        "Asif",
        "Muntaha",
        "Mudassir",
        "Imran",
        "Salman",
        "Rabiya",
        "Arzaan",
        "Shahzaib",
        "Shoaib",
        "Junaid",
        "Suhana",
        "Inaaya",
        "Izyan",
        "Zainab",
        "Iqra",
        "Ayra",
        "Arwa",
        "Anisha",
        "Ansharah",
        "Umama",
        "Shezan",
        "Uzma",
        "Fatima",
        "Hamdan",
        "Waqas",
        "Farhan",
        "Sufyan",
        "Mannat",
        "Mishaal",
        "Hammad",
        "Aleena",
        "Saad",
        "Muskan",
        "Suhaan",
        "Altamash",
        "Awais",
        "Iram",
        "Arsala",
        "Afsana"
    ];

    // write function that checks input string for muslim names
    public function isMuslimName($name): bool
    {
        if (in_array($name, $this->muslimNames)) {
            return true;
        } else {
            return false;
        }
    }
}