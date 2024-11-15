
var subdomainVisits = function(cpdomains) {
    let hash = {}
    let output = []
    //["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]
    for(let cpdomain of cpdomains){
        let [count, domain] = cpdomain.split(" ")   //count = 900, domain = google.mail.com
        let subdomains = domain.split(".") //[google, mail, com]
        subdomainCopy = [...subdomains]

        for(let i = 0; i < subdomains.length;i++){
            let currSubdomain = subdomainCopy.join(".") 
            hash[currSubdomain] == undefined? hash[currSubdomain] = Number(count):hash[currSubdomain]+=Number(count)
            subdomainCopy.shift()
        }
    }
    for(let key in hash){
        output.push(`${hash[key]} ${key}`)
    }
    return output
};

console.log(subdomainVisits(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]))
