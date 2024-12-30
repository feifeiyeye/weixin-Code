

var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Global Crypto object
var Crypto = {};
var util = {}

// Crypto utilities
util = Crypto.util = {

	// Bit-wise rotate left
	rotl: function (n, b) {
		return (n << b) | (n >>> (32 - b));
	},

	// Bit-wise rotate right
	rotr: function (n, b) {
		return (n << (32 - b)) | (n >>> b);
	},

	// Swap big-endian to little-endian and vice versa
	endian: function (n) {

		// If number given, swap endian
		if (n.constructor == Number) {
			return util.rotl(n, 8) & 0x00FF00FF |
				util.rotl(n, 24) & 0xFF00FF00;
		}

		// Else, assume array and swap all items
		for (var i = 0; i < n.length; i++)
			n[i] = util.endian(n[i]);
		return n;

	},

	// Generate an array of any length of random bytes
	randomBytes: function (n) {
		for (var bytes = []; n > 0; n--)
			bytes.push(Math.floor(Math.random() * 256));
		return bytes;
	},

	// Convert a string to a byte array
	stringToBytes: function (str) {
		var bytes = [];
		for (var i = 0; i < str.length; i++)
			bytes.push(str.charCodeAt(i));
		return bytes;
	},

	// Convert a byte array to a string
	bytesToString: function (bytes) {
		var str = [];
		for (var i = 0; i < bytes.length; i++)
			str.push(String.fromCharCode(bytes[i]));
		return str.join("");
	},

	// Convert a string to big-endian 32-bit words
	stringToWords: function (str) {
		var words = [];
		for (var c = 0, b = 0; c < str.length; c++ , b += 8)
			words[b >>> 5] |= str.charCodeAt(c) << (24 - b % 32);
		return words;
	},

	// Convert a byte array to big-endian 32-bits words
	bytesToWords: function (bytes) {
		var words = [];
		for (var i = 0, b = 0; i < bytes.length; i++ , b += 8)
			words[b >>> 5] |= bytes[i] << (24 - b % 32);
		return words;
	},

	// Convert big-endian 32-bit words to a byte array
	wordsToBytes: function (words) {
		var bytes = [];
		for (var b = 0; b < words.length * 32; b += 8)
			bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
		return bytes;
	},

	// Convert a byte array to a hex string
	bytesToHex: function (bytes) {
		var hex = [];
		for (var i = 0; i < bytes.length; i++) {
			hex.push((bytes[i] >>> 4).toString(16));
			hex.push((bytes[i] & 0xF).toString(16));
		}
		return hex.join("");
	},

	// Convert a hex string to a byte array
	hexToBytes: function (hex) {
		var bytes = [];
		for (var c = 0; c < hex.length; c += 2)
			bytes.push(parseInt(hex.substr(c, 2), 16));
		return bytes;
	},

	// Convert a byte array to a base-64 string
	bytesToBase64: function (bytes) {

		// Use browser-native function if it exists
		if (typeof btoa == "function") return btoa(util.bytesToString(bytes));

		var base64 = [],
			overflow;

		for (var i = 0; i < bytes.length; i++) {
			switch (i % 3) {
				case 0:
					base64.push(base64map.charAt(bytes[i] >>> 2));
					overflow = (bytes[i] & 0x3) << 4;
					break;
				case 1:
					base64.push(base64map.charAt(overflow | (bytes[i] >>> 4)));
					overflow = (bytes[i] & 0xF) << 2;
					break;
				case 2:
					base64.push(base64map.charAt(overflow | (bytes[i] >>> 6)));
					base64.push(base64map.charAt(bytes[i] & 0x3F));
					overflow = -1;
			}
		}

		// Encode overflow bits, if there are any
		if (overflow != undefined && overflow != -1)
			base64.push(base64map.charAt(overflow));

		// Add padding
		while (base64.length % 4 != 0) base64.push("=");

		return base64.join("");

	},

	// Convert a base-64 string to a byte array
	base64ToBytes: function (base64) {

		// Use browser-native function if it exists
		if (typeof atob == "function") return util.stringToBytes(atob(base64));

		// Remove non-base-64 characters
		base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

		var bytes = [];

		for (var i = 0; i < base64.length; i++) {
			switch (i % 4) {
				case 1:
					bytes.push((base64map.indexOf(base64.charAt(i - 1)) << 2) |
						(base64map.indexOf(base64.charAt(i)) >>> 4));
					break;
				case 2:
					bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & 0xF) << 4) |
						(base64map.indexOf(base64.charAt(i)) >>> 2));
					break;
				case 3:
					bytes.push(((base64map.indexOf(base64.charAt(i - 1)) & 0x3) << 6) |
						(base64map.indexOf(base64.charAt(i))));
					break;
			}
		}

		return bytes;

	}

}

var HMAC = function (hasher, message, key, options) {

	// Allow arbitrary length keys
	key = key.length > hasher._blocksize * 4 ?
		hasher(key, { asBytes: true }) :
		util.stringToBytes(key);

	// XOR keys with pad constants
	var okey = key,
		ikey = key.slice(0);
	for (var i = 0; i < hasher._blocksize * 4; i++) {
		okey[i] ^= 0x5C;
		ikey[i] ^= 0x36;
	}

	var hmacbytes = hasher(util.bytesToString(okey) +
		hasher(util.bytesToString(ikey) + message, { asString: true }),
		{ asBytes: true });
	return options && options.asBytes ? hmacbytes :
		options && options.asString ? util.bytesToString(hmacbytes) :
			util.bytesToHex(hmacbytes);

};
// Public API
var SHA1 = function (message, options) {
	var digestbytes = util.wordsToBytes(SHA1._sha1(message));
	return options && options.asBytes ? digestbytes :
		options && options.asString ? util.bytesToString(digestbytes) :
			util.bytesToHex(digestbytes);
};

// The core
SHA1._sha1 = function (message) {

	var m = util.stringToWords(message),
		l = message.length * 8,
		w = [],
		H0 = 1732584193,
		H1 = -271733879,
		H2 = -1732584194,
		H3 = 271733878,
		H4 = -1009589776;

	// Padding
	m[l >> 5] |= 0x80 << (24 - l % 32);
	m[((l + 64 >>> 9) << 4) + 15] = l;

	for (var i = 0; i < m.length; i += 16) {

		var a = H0,
			b = H1,
			c = H2,
			d = H3,
			e = H4;

		for (var j = 0; j < 80; j++) {

			if (j < 16) w[j] = m[i + j];
			else {
				var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
				w[j] = (n << 1) | (n >>> 31);
			}

			var t = ((H0 << 5) | (H0 >>> 27)) + H4 + (w[j] >>> 0) + (
				j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 :
					j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 :
						j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 :
							(H1 ^ H2 ^ H3) - 899497514);

			H4 = H3;
			H3 = H2;
			H2 = (H1 << 30) | (H1 >>> 2);
			H1 = H0;
			H0 = t;

		}

		H0 += a;
		H1 += b;
		H2 += c;
		H3 += d;
		H4 += e;

	}

	return [H0, H1, H2, H3, H4];

};

// Package private blocksize
SHA1._blocksize = 16;

module.exports = {Crypto,util,SHA1,HMAC}

