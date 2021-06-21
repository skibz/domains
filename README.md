
# domains

## usage

* start by installing dependencies with `npm install` (it's small, i promise)
* then run `make whois` and it'll download lists of potential domains to one file per cctld and store it in the `wordlists` directory. after this, a whois check will be run against every domain listed for every file. the script will output whether the domain is available for registration. eg:

> bricabr.ac is unavailable

or

> coulibi.ac is available

* feel free to add more tlds to the `src/tlds.txt` file, and the script will try to find words that end with that tld, and then `whois` check them.
* if you want to nuke the wordlists, run `make clean`

## note

this whole thing is hella messy for obvious reasons... i wrote this years ago and didn't really have ergonomics or ease of use in mind at the time, nor did i spend any time ensuring that it works on platforms other than macos. i just wanted to find some l33t domainz. you might have some trouble using this tool if you aren't comfortable tinkering with a makefile or javascript source.

there are `sleep`s in the loops to limit the rate at which wordlists are generated and whois calls are performed. you may wish to adjust, or remove, them. (see the `Makefile`)

there are about two-hundred and fifty cctlds, so it'll take at least four to five minutes to generate all of the wordlists. this step only has to be performed once, though. some of the wordlists will be empty because there aren't any known english words with that specific suffix.

it'll surely take a hell of a long time to run whois against every domain name in all of the wordlists, so you may want to remove the tlds from `src/tlds.txt` that you aren't interested in, in order to speed everything up. for instance, if you just want to see which domains are available for .co, remove everything except .co from `src/tlds.txt`.

## todo

* whois checks on a specific tld without modifying `src/tlds.txt`
* find a better wordfinder website or use multiple... this one is missing some obvious words. (wordfinders.com)