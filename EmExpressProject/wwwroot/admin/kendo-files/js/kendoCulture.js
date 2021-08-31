

(function (window, undefined) {
    kendo.cultures["sq-AL"] = {
        name: "sq-AL",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%", "n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Albanian Lek",
                abbr: "ALL",
                pattern: ["-n $", "n $"],
                decimals: 0,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "Lekë"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"],
                    namesAbbr: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"],
                    namesShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"]
                },
                months: {
                    names: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
                    namesAbbr: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gsh", "Sht", "Tet", "Nën", "Dhj"]
                },
                AM: ["e paradites", "e paradites", "E PARADITES"],
                PM: ["e pasdites", "e pasdites", "E PASDITES"],
                patterns: {
                    d: "d.M.yyyy",
                    D: "dddd, d MMMM yyyy",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    g: "d.M.yyyy h:mm tt",
                    G: "d.M.yyyy h:mm:ss tt",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);

(function (window, undefined) {
    kendo.cultures["sr-SP-Latn"] = {
        name: "sr-SP-Latn",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ".",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%", "n%"],
                decimals: 2,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "Serbian Dinar",
                abbr: "RSD",
                pattern: ["-n $", "n $"],
                decimals: 0,
                ",": ".",
                ".": ",",
                groupSize: [3],
                symbol: "RSD"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"],
                    namesAbbr: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
                    namesShort: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"]
                },
                months: {
                    names: ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"],
                    namesAbbr: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec"]
                },
                AM: ["pre podne", "pre podne", "PRE PODNE"],
                PM: ["po podne", "po podne", "PO PODNE"],
                patterns: {
                    d: "d.M.yyyy.",
                    D: "dddd, dd. MMMM yyyy.",
                    F: "dddd, dd. MMMM yyyy. HH.mm.ss",
                    g: "d.M.yyyy. HH.mm",
                    G: "d.M.yyyy. HH.mm.ss",
                    m: "d. MMMM",
                    M: "d. MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH.mm",
                    T: "HH.mm.ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy.",
                    Y: "MMMM yyyy."
                },
                "/": ".",
                ":": ".",
                firstDay: 1
            }
        }
    }
})(this);

(function (window, undefined) {
    kendo.cultures["en-US"] = {
        name: "en-US",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": ",",
            ".": ".",
            groupSize: [3],
            percent: {
                pattern: ["-n%", "n%"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                name: "British Pound",
                abbr: "GBP",
                pattern: ["-$n", "$n"],
                decimals: 2,
                ",": ",",
                ".": ".",
                groupSize: [3],
                symbol: "£"
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
                },
                months: {
                    names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                },
                AM: ["AM", "am", "AM"],
                PM: ["PM", "pm", "PM"],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    F: "dd MMMM yyyy HH:mm:ss",
                    g: "dd/MM/yyyy HH:mm",
                    G: "dd/MM/yyyy HH:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": "/",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
