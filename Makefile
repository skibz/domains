
.PHONY: clean
clean:
	rm -rf ./wordlists

.PHONY: wordlists
wordlists:
	mkdir -p wordlists;
	for suffix in $$(cat src/tlds.txt); do \
		echo generating wordlist for .$$suffix; \
		node src/words-ending-with.js $$suffix > wordlists/$$suffix.txt; \
		sleep 1; \
	done;

.PHONY: whois
whois: wordlists
	for tld in wordlists/*.txt; do \
		for domain in $$(cat $$tld); do \
			whois $$domain | egrep -q '^No match|^NOT FOUND|^Not fo|AVAILABLE|^No Data Fou|has not been regi|No entri'; \
			if [ $$? -eq 0 ]; then \
				echo $$domain is available; \
			else \
				echo $$domain is unavailable; \
			fi; \
			sleep 1; \
		done; \
		sleep 1; \
	done;