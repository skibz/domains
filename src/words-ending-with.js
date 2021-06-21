
// TODO
// replace with axios
var http = require('https')
var fs = require('fs')

var cheerio = require('cheerio')

var [, , suffix] = process.argv

void function() {
	if (!suffix) {
		console.log('FATAL got no suffix', suffix)
		process.exit(1)
		return
	}

	try {
		var req = http.get(
			`https://www.wordfinders.com/words-ending-with-${suffix}/`
		)	
	} catch (err) {
		console.log('FATAL error constructing request', err)
		process.exit(1)
		return
	}

	// TODO
	// retries with exponential backoff
	req.on('error', function(err) {
		console.log('FATAL got error from upstream', err)
		process.exit(1)
	}).on('timeout', function() {
		console.log('FATAL got timed out')
		process.exit(1)
	}).on('abort', function() {
		console.log('FATAL got aborted')
		process.exit(1)
	}).on('response', function(res) {
		var data = Buffer.allocUnsafe(0)

		res.on('data', function(d) {
			data = Buffer.concat([data, d], data.length + d.length)
		}).on('end', function() {
			var $ = cheerio.load(data.toString())

			var words = Array.from(
				$('li.jumble a')
			).map(function(a) {
				var [word] = a.children
				return word.data
			}).map(function(word) {
				var suffix_index = word.lastIndexOf(suffix)
				var prefix = word.slice(0, suffix_index)
				return `${prefix}.${suffix}`
			})

			var final_word = words[words.length - 1]
			if (final_word === `.${suffix}`) {
				var removed = words.splice(words.length - 1, 1)
			}

			fs.writeFile(
				`${__dirname}/../wordlists/${suffix}.txt`,
				words.join('\n'),
				function(err) {
					if (err) {
						console.log('FATAL failed to write wordlist', err)
						process.exit(1)
						return
					}
				}
			)
		})
	})
}()