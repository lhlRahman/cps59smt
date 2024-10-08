"use client";
import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
// Import the JSON data

const flashcardsData = [
  {
    "slide_number": 1,
    "type": "flashcard",
    "question": "What are some examples of classical cryptography techniques?",
    "answer": "Cæsar cipher, Vigenere cipher, substitution ciphers, transposition ciphers."
  },
  {
    "slide_number": 1,
    "type": "flashcard",
    "question": "Which modern encryption algorithms are mentioned in the slide?",
    "answer": "DES, AES, BlowFish, and a bit of IDEA algorithm."
  },
  {
    "slide_number": 1,
    "type": "flashcard",
    "question": "Which book and chapter are recommended for further reading on this topic?",
    "answer": "M. Bishop's 'Computer Security the Art and Science', second edition, Chapter 10."
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "What is the core technology of cyberspace?",
    "answer": "Cryptography is the core technology of cyberspace."
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "What aspect of cryptography is important to understand according to the slide?",
    "answer": "It is important to understand the ramifications of cryptography, not necessarily the math behind it."
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "What is the oldest application of cryptography?",
    "answer": "The oldest application of cryptography is encryption."
  },
  {
    "slide_number": 3,
    "type": "flashcard",
    "question": "What is the role of the encryption algorithm in an encryption scheme?",
    "answer": "The encryption algorithm is used to encode the plaintext."
  },
  {
    "slide_number": 3,
    "type": "flashcard",
    "question": "In an encryption scheme, what is the term for the original message before encoding?",
    "answer": "Plaintext"
  },
  {
    "slide_number": 3,
    "type": "flashcard",
    "question": "What component of an encryption scheme is used to recover the original message from the encoded message?",
    "answer": "Decryption algorithm"
  },
  {
    "slide_number": 4,
    "type": "flashcard",
    "question": "What are the three main ways algorithms can be classified in cryptography?",
    "answer": "Algorithms can be classified by the type of operations used for transforming plaintext to ciphertext and back, the number of keys used, and the way in which the plaintext is processed."
  },
  {
    "slide_number": 4,
    "type": "flashcard",
    "question": "What is the difference between symmetric and asymmetric encryption?",
    "answer": "Symmetric encryption uses a single key for both encryption and decryption, whereas asymmetric encryption uses two keys, a public key for encryption and a private key for decryption."
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "Why is it important that security depends on the secrecy of the key rather than the algorithm?",
    "answer": "Because algorithms need to be physically distributed and can be disassembled, making it difficult to keep them secret. Keys can be kept secret to ensure security."
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "What is one advantage of using open algorithms in security?",
    "answer": "Open algorithms can be scrutinized for correctness, ensuring they function as intended."
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "What was the Clipper chip and what algorithm did it use?",
    "answer": "The Clipper chip was a hardware encryption device that used the Skipjack algorithm, active from 1993 to 1996."
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "What is the average time required for an exhaustive key search with a 32-bit key size at 10^6 decryption per microsecond?",
    "answer": "2.15 milliseconds"
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "How long does it take to perform an exhaustive key search with a 56-bit key size at 10^6 decryption per microsecond?",
    "answer": "10 hours"
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "For a 128-bit key size, how many years would an exhaustive key search take at 10^6 decryption per microsecond?",
    "answer": "5.4 x 10^18 years"
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "What is the time required for an exhaustive key search with a 168-bit key size at 10^6 decryption per microsecond?",
    "answer": "5.9 x 10^30 years"
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "What is symmetric key cryptography?",
    "answer": "Symmetric key cryptography uses identical keys for both encryption and decryption."
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "In public-key cryptography, what is the role of the public key?",
    "answer": "In public-key cryptography, the public key is used for encryption."
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "Who is Trudy in the context of cryptography?",
    "answer": "Trudy is an intruder attempting a man-in-the-middle attack by listening to the traffic."
  },
  {
    "slide_number": 8,
    "type": "flashcard",
    "question": "Who are Bob and Alice in the context of electronic transactions?",
    "answer": "Bob and Alice represent parties that exchange emails, messages, engage in online purchases, online banking, DNS servers, and routers exchanging routing table updates."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "What are the components of a cryptosystem as described in the slide?",
    "answer": "The components of a cryptosystem are a quintuple: (E, D, M, K, C), where M is the set of plaintexts, K is the set of keys, C is the set of ciphertexts, E is the set of encryption functions, and D is the set of decryption functions."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "What is the main purpose of cryptography?",
    "answer": "The main purpose of cryptography is to provide confidentiality."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "Besides confidentiality, what other benefits can cryptography provide?",
    "answer": "Cryptography can also provide integrity of data, origin authentication, and non-repudiation."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "What is the set M in the Caesar Cipher example?",
    "answer": "M is the set of sequences of letters stored in an array in the range (0..25), where M[0]=A, M[1]=B, ..., M[25]=Z."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "What is the encryption function Ek(m) for the Caesar Cipher?",
    "answer": "Ek(m) = (m + k) mod 26, where k is an integer from the set K and m is a letter."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "How do you decrypt a letter 'c' in the Caesar Cipher using key k?",
    "answer": "Dk(c) = (26 + c - k) mod 26."
  },
  {
    "slide_number": 10,
    "type": "calculation",
    "question": "What is the encryption of 'HELLO WORLD' using a Caesar Cipher with key 3?",
    "answer": "KHOOR ZRUOG"
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "Who is the adversary in cryptographic attacks?",
    "answer": "The adversary is the opponent whose goal is to break the cryptosystem."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "What is assumed to be known to the adversary in cryptographic attacks?",
    "answer": "It is assumed that the adversary knows the algorithm used (public), but not the key."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "List the three types of cryptographic attacks in decreasing order of difficulty.",
    "answer": "1. Ciphertext only: adversary has only ciphertext; goal is to find plaintext and possibly key. 2. Known plaintext: adversary has ciphertext and corresponding plaintext; goal is to find key. 3. Chosen plaintext: adversary may supply plaintexts and obtain corresponding ciphertext; goal is to find key."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "What is a pangram and provide an example?",
    "answer": "A pangram is a sentence that contains every letter of the alphabet. Example: 'a quick brown fox jumps over the lazy dog'."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "What is a common misconception about how real attacks on cryptography occur?",
    "answer": "Real attacks generally don’t break cryptography; they often bypass it by exploiting other vulnerabilities."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "What are mathematical attacks in cryptography based on?",
    "answer": "Mathematical attacks are based on the analysis of the underlying mathematics of cryptographic algorithms, which are public, while the keys remain secret."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "How do statistical attacks work in cryptography?",
    "answer": "Statistical attacks make assumptions about the distribution of letters, digrams, and trigrams in plaintext, assuming that the ciphertext will have similar statistical behavior as the language model used."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "What is the main characteristic of classical (symmetric) cryptography?",
    "answer": "In classical (symmetric) cryptography, the sender and receiver share a common key for encryption and decryption."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "What are the two basic types of symmetric ciphers?",
    "answer": "The two basic types of symmetric ciphers are transposition ciphers and substitution ciphers."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "How can transposition and substitution ciphers be attacked?",
    "answer": "They can be attacked by statistical methods, such as analyzing 1-gram and 2-gram occurrences of letters in the message."
  },
  {
    "slide_number": 14,
    "type": "flashcard",
    "question": "What is a substitution cipher in symmetric key cryptography?",
    "answer": "A substitution cipher is a method of encryption by substituting one thing for another, such as replacing each letter in the plaintext with another letter."
  },
  {
    "slide_number": 14,
    "type": "flashcard",
    "question": "What does a monoalphabetic cipher do?",
    "answer": "A monoalphabetic cipher substitutes one letter for another using a fixed substitution over the entire message."
  },
  {
    "slide_number": 14,
    "type": "flashcard",
    "question": "How is plaintext encrypted using the given example of a monoalphabetic cipher?",
    "answer": "In the example, each letter in the plaintext is replaced with a corresponding letter from the ciphertext alphabet: plaintext 'bob. i love you. alice' becomes ciphertext 'nkn. s gktc wky. mgsbc'."
  },
  {
    "slide_number": 14,
    "type": "flashcard",
    "question": "How can a simple substitution cipher be broken?",
    "answer": "A simple substitution cipher can be broken using brute force by trying all permutations or by analyzing letter frequency statistics."
  },
  {
    "slide_number": 15,
    "type": "flashcard",
    "question": "What is the purpose of using a Vigenere cipher in cryptography?",
    "answer": "The Vigenere cipher is used to mitigate statistical attacks on substitution ciphers by using a sequence of keys represented by a string, also known as a poly-alphabetic cipher."
  },
  {
    "slide_number": 15,
    "type": "flashcard",
    "question": "How does the Vigenere cipher relate to Caesar ciphers?",
    "answer": "The Vigenere cipher is essentially a combination of Caesar ciphers, using multiple shifting sequences to encrypt the message."
  },
  {
    "slide_number": 15,
    "type": "flashcard",
    "question": "What is a one-time pad in the context of the Vigenere cipher?",
    "answer": "A one-time pad is a variant of the Vigenere cipher where the key is used only once, chosen at random, and has at least the length of the message."
  },
  {
    "slide_number": 16,
    "type": "flashcard",
    "question": "What is the encryption approach mentioned for Fall 2024 that builds on the Vigenere cipher?",
    "answer": "A more sophisticated encryption approach using n substitution ciphers in a cycling pattern."
  },
  {
    "slide_number": 16,
    "type": "flashcard",
    "question": "How is the cyclic pattern applied in the encryption process, as per the example with n=4?",
    "answer": "The cyclic pattern is M1, M3, M4, M3, M2; repeated for each new plaintext symbol."
  },
  {
    "slide_number": 16,
    "type": "flashcard",
    "question": "What distinguishes stream ciphers from block ciphers?",
    "answer": "Stream ciphers encipher each letter independently, while block ciphers encipher the whole message or large parts as a stream of bits."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "What is symmetric key cryptography?",
    "answer": "In symmetric key cryptography, Bob and Alice share the same key for both encryption and decryption."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "What is an example of a symmetric key in cryptography?",
    "answer": "An example of a symmetric key is a known substitution pattern in a mono-alphabetic substitution cipher."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "What is a key challenge in symmetric key cryptography?",
    "answer": "A key challenge in symmetric key cryptography is how Bob and Alice agree on the key value."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "What is the block size used by the Data Encryption Standard (DES)?",
    "answer": "DES encrypts blocks of 64 bits."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "How many bits does the DES user's key have after dropping the parity bits?",
    "answer": "The DES user's key is reduced to 56 bits after dropping the parity bits."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "How many rounds does the DES cipher algorithm consist of?",
    "answer": "The DES cipher algorithm consists of 16 rounds (iterations)."
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "What is the initial size of the key before parity bits are removed in the generation of 16 round keys?",
    "answer": "64 bits"
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "How many bits are extracted for each round key after permutation?",
    "answer": "48 bits"
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "What are PC-1 and PC-2 used for in the key generation process?",
    "answer": "PC-1 and PC-2 are permutation tables used to permute the bits during key generation."
  },
  {
    "slide_number": 20,
    "type": "flashcard",
    "question": "What is the role of the function 'f' in the encipherment process described for Cp 571DES?",
    "answer": "The function 'f' expands the right half of the input to 48 bits, XORs it with the round key, splits it into 8 sets of 6 bits, processes each set through an S-box, and outputs a 32-bit entity that is permutated."
  },
  {
    "slide_number": 20,
    "type": "flashcard",
    "question": "What is the purpose of the S-box in the encipherment process?",
    "answer": "The S-box substitutes each 6-bit input set with a 4-bit output, contributing to the non-linearity and complexity of the encryption."
  },
  {
    "slide_number": 20,
    "type": "flashcard",
    "question": "How are the initial and final stages of the Cp 571DES encipherment process described?",
    "answer": "The process begins with an initial permutation (IP) and ends with an inverse initial permutation (IP-1)."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "What is the purpose of the Expansion (E) function in DES?",
    "answer": "The Expansion (E) function in DES expands the 32-bit half-block Ri–1 to 48 bits by duplicating certain bits, allowing for XOR operations with the 48-bit subkey Ki."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "How many bits are input and output for each S-box in DES?",
    "answer": "Each S-box in DES takes 6 bits as input and produces 4 bits as output."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "How many S-boxes are used in the DES function?",
    "answer": "DES uses 8 S-boxes in its function."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "What is the mode called when DES is used directly?",
    "answer": "Electronic Code Book Mode (ECB)"
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "Why is ECB mode considered weak?",
    "answer": "Because it enciphers each block of 64 bits independently."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "What does CBC mode use to XOR each block?",
    "answer": "CBC mode XORs each block with the previous ciphertext block."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "What is required for the first block in CBC mode?",
    "answer": "An initialization vector is required for the first block."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "Describe the Encrypt-Decrypt-Encrypt Mode in DES.",
    "answer": "It uses two keys (k, k') and is represented as c = DESk(DESk’⁻¹(DESk(m)))."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "Describe the Encrypt-Encrypt-Encrypt Mode in DES.",
    "answer": "It uses three keys (k, k', k'') and is represented as c = DESk(DESk’(DESk''(m)))."
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "What does CBC stand for in the context of encryption?",
    "answer": "Cipher Block Chaining"
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "In CBC mode, what is the role of the initialization vector (IV)?",
    "answer": "The initialization vector is used to provide an initial randomization for encryption, ensuring that the same plaintext block will encrypt to different ciphertexts each time."
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "What encryption algorithm is used in the given CBC mode example?",
    "answer": "DES (Data Encryption Standard)"
  },
  {
    "slide_number": 24,
    "type": "flashcard",
    "question": "What encryption standard was selected by NIST as the successor to DES in 2001?",
    "answer": "Rijndael, which became known as the Advanced Encryption Standard (AES)."
  },
  {
    "slide_number": 24,
    "type": "flashcard",
    "question": "When was the original DES officially withdrawn?",
    "answer": "The original DES was officially withdrawn in 2005."
  },
  {
    "slide_number": 24,
    "type": "flashcard",
    "question": "What is the only approved implementation of DES?",
    "answer": "The only approved implementation of DES is triple DES."
  },
  {
    "slide_number": 25,
    "type": "flashcard",
    "question": "What is the Advanced Encryption Standard (AES) and what did it replace?",
    "answer": "AES is a relatively new symmetric-key NIST standard that replaced DES."
  },
  {
    "slide_number": 25,
    "type": "flashcard",
    "question": "What are the possible key lengths for AES?",
    "answer": "AES can have 128, 192, or 256 bit keys."
  },
  {
    "slide_number": 25,
    "type": "flashcard",
    "question": "How does the number of rounds in AES relate to the key length?",
    "answer": "The number of rounds in AES is a function of the key length, with at least 10 rounds."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "What is the block size encrypted by AES?",
    "answer": "AES encrypts blocks of 128 bits (16 bytes)."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "What key sizes are supported by AES?",
    "answer": "AES supports key sizes of 128, 192, or 256 bits."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "How many rounds does AES have for a 192-bit key?",
    "answer": "AES has 12 rounds for a 192-bit key."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "What is the initial step in the AES encryption process as described in the slide?",
    "answer": "The plaintext input is placed into a state array, which is then combined with the zero-th round key."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "How many bytes does each round key in the AES encryption process contain?",
    "answer": "Each round key contains 16 bytes (128 bits)."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "How is the state array treated in the AES algorithm?",
    "answer": "The state array is treated as a 4x4 byte matrix."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "What is the first step in a round of AES encryption?",
    "answer": "The first step is combining the input with the zero-th round key using the XOR operation, known as AddRoundKey."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "What transformation is applied to each byte of the state array in the AES encryption process?",
    "answer": "New values are substituted for each byte of the state array using the Rijndael S-box, a process known as SubBytes."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "How are the rows of the state array modified in the AES encryption process?",
    "answer": "The contents of the rows are cyclically shifted by the number of the row: 0, 1, 2, and 3 byte positions in the ShiftRows step."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "What is the MixColumns step in AES encryption?",
    "answer": "MixColumns involves altering each column independently using matrix multiplication with a known matrix c(x)."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "Is the MixColumns step performed in the last round of AES encryption?",
    "answer": "No, the MixColumns step is not done in the last round of AES encryption."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "What happens to the result of the MixColumns step in AES encryption?",
    "answer": "The result of the MixColumns step is XORed with the round key in the AddRoundKey step."
  },
  {
    "slide_number": 30,
    "type": "flashcard",
    "question": "What is the first step in the AES encryption process after the initial round key addition?",
    "answer": "The first step after the initial round key addition in AES encryption is the SubBytes step."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "What is the first step in the AES decryption process?",
    "answer": "In decryption, the round key schedule is reversed."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "What is the commutative property in the AES decryption algorithm?",
    "answer": "The commutative property refers to InvShiftRows and InvSubBytes, which can be applied in either order without affecting the result."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "Why is InvMixColumns not applied in the last round of AES decryption?",
    "answer": "InvMixColumns is the inverse of MixColumns and is not applied in the last round to maintain the structure of the AES algorithm."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "What is one major advantage of AES design compared to DES?",
    "answer": "AES was designed to withstand attacks that DES is vulnerable to, and all design decisions are made public."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "How does AES ensure that every bit in the state array is dependent on previous bits?",
    "answer": "After 2 successive rounds, every bit in the AES state array depends on every bit in the state array 2 rounds ago."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "Does AES have weak or semi-weak keys like DES?",
    "answer": "No, AES does not have weak or semi-weak keys like DES."
  },
  {
    "slide_number": 33,
    "type": "flashcard",
    "question": "Do DES modes work with AES?",
    "answer": "Yes, DES modes also work with AES."
  },
  {
    "slide_number": 33,
    "type": "flashcard",
    "question": "Why are EDE and 'Triple-AES' not used?",
    "answer": "The extended block size makes this unnecessary."
  },
  {
    "slide_number": 33,
    "type": "flashcard",
    "question": "What is the new counter mode added for AES?",
    "answer": "The new counter mode added is CTR."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "Who developed Blowfish and in what year?",
    "answer": "Blowfish was developed by B. Schneier in 1993."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "What operations does Blowfish use for encryption?",
    "answer": "Blowfish uses binary addition, XOR function, and 32-bit table lookup."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "How much memory does Blowfish require and how many rounds are needed for subkey generation?",
    "answer": "Blowfish fits in 5Kbytes of memory and needs 521 rounds for subkey generation."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "Why is Blowfish not suitable for frequent key changes?",
    "answer": "Blowfish is not suitable for frequent key changes due to its need for 521 rounds for subkey generation."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "What is the primary operation of RC4 in its encryption process?",
    "answer": "RC4 is a stream cipher where the key is input into a random number generator, and the output is XOR-ed with each byte."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "How does RC4 perform in software environments?",
    "answer": "RC4 runs quickly in software."
  },
  {
    "slide_number": 35,
    "type": "flashcard",
    "question": "What is the status of Blowfish in terms of patents and licensing?",
    "answer": "Blowfish is unpatented, license-free, and available free for all uses."
  },
  {
    "slide_number": 35,
    "type": "flashcard",
    "question": "Why is more attention now given to block ciphers with larger block sizes?",
    "answer": "More attention is given to block ciphers with larger block sizes, such as AES or Twofish, because they offer enhanced security over smaller block sizes."
  },
  {
    "slide_number": 35,
    "type": "flashcard",
    "question": "What did Bruce Schneier state about the Blowfish algorithm?",
    "answer": "Bruce Schneier stated that Blowfish is unpatented and will remain so in all countries, placing it in the public domain for free use by anyone."
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "What are the block size and key length range for the Blowfish algorithm?",
    "answer": "Blowfish has a 64-bit block size and a key length ranging from 32 bits to 448 bits, with a default of 128 bits."
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "How many rounds of encryption does the Blowfish algorithm use?",
    "answer": "The Blowfish algorithm uses 16 rounds of encryption."
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "In the Blowfish algorithm, what is the structure of the key expansion?",
    "answer": "The key expansion involves breaking the original key into a set of subkeys, with a P-array containing 18 instances of 32-bit subkeys and 4 S-boxes containing 256 entries each."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "How many subkey arrays are there in Blowfish's encryption routine?",
    "answer": "There are five subkey arrays in Blowfish's encryption routine: one 18-entry P-array and four 256-bit entry S-boxes."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "What is the output size from each S-box in Blowfish's encryption routine?",
    "answer": "Each S-box in Blowfish's encryption routine produces 32 bits of output."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "What is the input size fed into each S-box in Blowfish's encryption routine?",
    "answer": "Each S-box is fed by 8-bit input as an address."
  },
  {
    "slide_number": 38,
    "type": "flashcard",
    "question": "What is used every round in the Blowfish algorithm's encryption process?",
    "answer": "One entry of the P-array."
  },
  {
    "slide_number": 38,
    "type": "flashcard",
    "question": "How are the halves of the data block processed in the Blowfish algorithm?",
    "answer": "The input block is divided into halves XL and XR, and processed over 16 rounds."
  },
  {
    "slide_number": 38,
    "type": "flashcard",
    "question": "What happens after the final round in the Blowfish algorithm?",
    "answer": "Each half of the data block is XORed with one of the two remaining unused P-entries and the halves are recombined."
  },
  {
    "slide_number": 39,
    "type": "flashcard",
    "question": "What is the primary purpose of Blowfish's F function?",
    "answer": "The F function in Blowfish is used to split the 32-bit input into four 8-bit quarters, which are then used as input to the S-boxes. The outputs are added modulo 2^32 and XOR-ed to produce the final 32-bit output."
  },
  {
    "slide_number": 39,
    "type": "flashcard",
    "question": "How is decryption performed in the Blowfish algorithm?",
    "answer": "Decryption in Blowfish is performed by reversing the order of sub-keys (Pi). Since Blowfish is a Feistel network, it can be inverted by XORing P17 and P18 to the ciphertext block, then using the P-entries in reverse order."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "What is the first step in the Blowfish algorithm key expansion process?",
    "answer": "Initialize the P-array and S-boxes with values derived from the hexadecimal digits of pi, which contain no obvious pattern."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "How is the P-array modified with the key bits in the Blowfish algorithm?",
    "answer": "The P-array is XOR-ed with the key bits by circling through the key until the whole P-array is processed."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "How many times is the process repeated to calculate new subkeys for the P-array and S-boxes in the Blowfish algorithm?",
    "answer": "The process is repeated 521 times."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "What is the initial step in Blowfish's key schedule?",
    "answer": "Blowfish's key schedule starts by initializing the P-array and S-boxes with values derived from the hexadecimal digits of pi, which contain no obvious pattern."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "How is the secret key used in Blowfish's key schedule?",
    "answer": "The secret key is XORed with the P-entries in order, cycling the key if necessary."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "How many times does the Blowfish encryption algorithm run to generate all the subkeys?",
    "answer": "The Blowfish encryption algorithm runs 521 times to generate all the subkeys."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "What is a Feistel network?",
    "answer": "A Feistel network is an asymmetric structure used in the construction of block ciphers, named after cryptographer Horst Feistel."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "Name some block ciphers that use the Feistel network structure.",
    "answer": "Block ciphers that use the Feistel network structure include the US Data Encryption Standard, Soviet/Russian GOST, Blowfish, and Twofish."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "How do encryption and decryption work in a Feistel cipher?",
    "answer": "In a Feistel cipher, encryption and decryption are very similar operations, both consisting of iteratively running a 'round function' a fixed number of times."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What is AEdit?",
    "answer": "AEdit is a free Windows word processor incorporating text encryption."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What is Coolfish?",
    "answer": "Coolfish is an encrypting text editor for Windows."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What is Foopchat used for?",
    "answer": "Foopchat is used for encrypted chat and advanced file sharing using a client/server architecture."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "Which platform is JFile by Land-J Technologies designed for?",
    "answer": "JFile by Land-J Technologies is designed for the PalmOS platform."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What kind of privacy features does Freedom by Zero-Knowledge offer?",
    "answer": "Freedom by Zero-Knowledge offers privacy for web browsing, e-mail, chat, telnet, and newsgroups."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "Who designed the International Data Encryption Algorithm (IDEA)?",
    "answer": "IDEA was designed by Xuejia Lai and James L. Massey in 1991."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "What encryption algorithm was IDEA developed to replace?",
    "answer": "IDEA was developed to replace the DES algorithm."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "What was the original name of IDEA?",
    "answer": "IDEA was originally called IPES (Improved PES)."
  },
  {
    "slide_number": 45,
    "type": "flashcard",
    "question": "What block sizes does IDEA operate with and what is the size of its key?",
    "answer": "IDEA operates with 64-bit plaintext and cipher text blocks and is controlled by a 128-bit key."
  },
  {
    "slide_number": 45,
    "type": "flashcard",
    "question": "Which three algebraic functions are mixed in the IDEA algorithm?",
    "answer": "XOR, Addition modulo 2^16, and Multiplication modulo 2^16 + 1."
  },
  {
    "slide_number": 45,
    "type": "flashcard",
    "question": "How does IDEA differ in its approach compared to other block ciphers?",
    "answer": "IDEA completely avoids permutations, substitution boxes, and table lookups used in other block ciphers."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "How is the 64-bit plaintext block partitioned in the key generation process?",
    "answer": "The 64-bit plaintext block is partitioned into four 16-bit sub-blocks: X1, X2, X3, X4."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "How many rounds does the IDEA algorithm use?",
    "answer": "IDEA uses 8 rounds."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "How many subkeys are used in IDEA, and how are they distributed across the rounds?",
    "answer": "IDEA uses 52 subkeys, with six subkeys for each of the 8 rounds, and the last four subkeys are used for output transformation."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "How many 16-bit subkeys are generated from the 128-bit key in each round?",
    "answer": "Eight 16-bit subkeys are generated from the 128-bit key in each round."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "How is the 128-bit key manipulated between rounds?",
    "answer": "The 128-bit key is cyclically shifted 25 bits to the left, then divided into eight 16-bit subkeys for use in subsequent rounds."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "How many 16-bit key sub-blocks are ultimately generated in the key generation process?",
    "answer": "A total of 52 16-bit key sub-blocks are generated in the key generation process."
  },
  {
    "slide_number": 48,
    "type": "flashcard",
    "question": "What are the key sub-blocks used for in encryption and decryption?",
    "answer": "The key sub-blocks are used for encryption and decryption in individual rounds."
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "How are the first four 16-bit key sub-blocks combined with the 16-bit plaintext blocks in the encryption process?",
    "answer": "The first four 16-bit key sub-blocks are combined with two of the 16-bit plaintext blocks using addition modulo 2^16, and with the other two plaintext blocks using multiplication modulo 2^16 + 1."
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "What role do subkeys Z5(r) and Z6(r) play in the encryption process?",
    "answer": "Subkeys Z5(r) and Z6(r) are further used to combine the input bits."
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "How many encryption rounds are there, and how are the final 16-bit ciphertext blocks formed?",
    "answer": "There are 8 encryption rounds, and the four 16-bit values produced at the end of the 8th encryption round are combined with the last four of the 52 key sub-blocks using addition modulo 2^16 and multiplication modulo 2^16 + 1 to form the resulting four 16-bit ciphertext blocks."
  },
  {
    "slide_number": 50,
    "type": "flashcard",
    "question": "What is the main difference between the decryption and encryption processes?",
    "answer": "The key sub-blocks used for decryption are the inverse of those used during encryption, and they must be used in reverse order."
  },
  {
    "slide_number": 50,
    "type": "flashcard",
    "question": "How many 16-bit key sub-blocks are used in the decryption process?",
    "answer": "52"
  },
  {
    "slide_number": 51,
    "type": "flashcard",
    "question": "What modes of operation does IDEA support?",
    "answer": "IDEA supports Electronic Code Book (ECB), Cipher Block Chaining (CBC), Cipher Feedback (CFB), and Output Feedback (OFB) modes."
  },
  {
    "slide_number": 51,
    "type": "flashcard",
    "question": "Why is Electronic Code Book (ECB) mode not recommended for small block sizes?",
    "answer": "Electronic Code Book (ECB) mode is not recommended for small block sizes (smaller than 40 bits) because it can lead to security vulnerabilities."
  },
  {
    "slide_number": 52,
    "type": "flashcard",
    "question": "What market areas commonly use IDEA-based security solutions?",
    "answer": "IDEA-based security solutions are used in Financial Services, Broadcasting, and Government."
  },
  {
    "slide_number": 52,
    "type": "flashcard",
    "question": "In what fields can the IDEA algorithm be applied for data encryption?",
    "answer": "IDEA can be used for encrypting audio and video data for cable TV, pay TV, video conferencing, distance learning, sensitive financial and commercial data, email via public networks, and in smart cards."
  },
  {
    "slide_number": 53,
    "type": "flashcard",
    "question": "What was the primary encryption algorithm choice for PGP due to its design goals?",
    "answer": "IDEA was the first choice for data encryption when PGP was designed."
  },
  {
    "slide_number": 53,
    "type": "flashcard",
    "question": "What were the fundamental criteria for the development of IDEA?",
    "answer": "The fundamental criteria for the development of IDEA were military strength for all security requirements and easy hardware and software implementation."
  },
  {
    "slide_number": 54,
    "type": "flashcard",
    "question": "What course or subject does 'Cp 571' refer to in Fall 2024?",
    "answer": "'Cp 571' is likely a course code or identifier for a specific class or subject offered in Fall 2024."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "What is a potential problem with symmetric ciphers?",
    "answer": "A potential problem with symmetric ciphers is that the same key is used for both encryption and decryption, which can pose security risks if the key is compromised."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "How can key selection be made for symmetric ciphers?",
    "answer": "Key selection for symmetric ciphers can be made by one of the parties involved or by a trusted third party."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "What are the methods of key distribution for symmetric ciphers?",
    "answer": "Key distribution for symmetric ciphers may involve physical delivery or electronic delivery using encrypted communication, which requires another key or keys to be already in use."
  },
  {
    "slide_number": 56,
    "type": "flashcard",
    "question": "Why is it important to securely exchange, store, and destroy cryptographic keys?",
    "answer": "Cryptographic keys need to be securely exchanged, stored, and destroyed to prevent unauthorized access and ensure the security of encrypted communications."
  },
  {
    "slide_number": 56,
    "type": "flashcard",
    "question": "What mistake did the Soviets make with their one-time pads that allowed the NSA to decrypt the VENONA traffic?",
    "answer": "The Soviets reused their one-time pads instead of destroying them, allowing the NSA to decrypt the VENONA traffic."
  },
  {
    "slide_number": 56,
    "type": "flashcard",
    "question": "What role did the NSA's storage of Soviet encrypted messages play in the VENONA project?",
    "answer": "The NSA stored Soviet encrypted messages for over a decade, which helped in decrypting them despite the limited machine learning capabilities at the time."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "What is the role of a permanent key in digital communications?",
    "answer": "A permanent key is used for important communications and to exchange session keys."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "What is a session key and how is it used?",
    "answer": "A session key is temporary and used only for the duration of a session. It is created for each session and exchanged using a permanent key."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "Why does using a session key provide security against eavesdroppers?",
    "answer": "Eavesdroppers would need to guess the session key, which is difficult because it is short and changes with each session."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "What is unicity distance in cryptography?",
    "answer": "Unicity distance is the length of an original ciphertext needed to break the cipher by reducing the number of possible spurious keys to zero in a brute force attack. It represents the expected amount of ciphertext needed to determine the key completely, assuming the underlying message has redundancy."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "Who invented the concept of unicity distance and when?",
    "answer": "Claude Shannon invented the concept of unicity distance in the 1940s."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "What factors does the unicity distance depend on?",
    "answer": "The unicity distance depends on the characteristics of the plaintext and the key length of the encryption algorithm."
  },
  {
    "slide_number": 59,
    "type": "flashcard",
    "question": "What is the general rule of cryptanalysis regarding decoding messages with no additional information?",
    "answer": "With no additional information, it is impossible to decode the message."
  },
  {
    "slide_number": 59,
    "type": "calculation",
    "question": "Calculate the unicity distance (U) for a substitution cipher with an entropy of key space of 88.4 and redundancy of 3.2 bits per character.",
    "answer": "U = H(k)/D = 88.4/3.2 = 28 characters."
  },
  {
    "slide_number": 59,
    "type": "flashcard",
    "question": "How many bits of information does each character convey in the English alphabet?",
    "answer": "Each character conveys log2(26) = 4.7 bits of information."
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "Who is the author of the book 'Computer Security: The Art and Science' referenced in the slide?",
    "answer": "M. Bishop"
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "Which chapter of 'Computer Security: The Art and Science, second edition' is referenced in Slide 60?",
    "answer": "Chapter 10"
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "In which course is Slide 60 used, and who is the instructor?",
    "answer": "The course is CPS571 Introduction to Cyber-Security, and the instructor is Dr. Jelena Mišić."
  },
  {
    "slide_number": 61,
    "type": "flashcard",
    "question": "What is a message authentication code (MAC) similar to?",
    "answer": "A message authentication code is similar to symmetric key encryption."
  },
  {
    "slide_number": 61,
    "type": "flashcard",
    "question": "Why might receiving a message with a signature claiming to be from a famous person not guarantee authenticity?",
    "answer": "Because the key used to sign the message could have been shared with many other people, making it difficult to verify the true sender's identity."
  },
  {
    "slide_number": 62,
    "type": "flashcard",
    "question": "What is a Message Authentication Code (MAC) and what is its primary use?",
    "answer": "A Message Authentication Code (MAC) uses a shared secret key, similar to symmetric encryption algorithms, to ensure message integrity and detect tampering, but it does not protect privacy."
  },
  {
    "slide_number": 63,
    "type": "flashcard",
    "question": "What is a one-way hash function used for?",
    "answer": "A one-way hash function is used to produce a message digest (its 'fingerprint') that is simple to compute but infeasible or impossible to reverse."
  },
  {
    "slide_number": 63,
    "type": "flashcard",
    "question": "What is the characteristic of the message digest produced by a one-way hash function?",
    "answer": "The message digest usually has a fixed length, regardless of the length of the original message."
  },
  {
    "slide_number": 63,
    "type": "flashcard",
    "question": "Why are cryptographic hash functions preferred over encryption algorithms like DES for certain applications?",
    "answer": "Cryptographic hash functions execute faster in software than encryption algorithms like DES, and the code is widely available."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "Where were Unix passwords initially kept?",
    "answer": "Unix passwords were initially kept in /etc/passwd."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "What improvement was made to Unix password storage after they were initially kept in plain sight?",
    "answer": "The hash of the password was stored instead of the password itself."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "What is a 'salt' in the context of Unix password security?",
    "answer": "A 'salt' is a string that is added to a password before hashing to enhance security."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "Where are Unix passwords currently stored?",
    "answer": "Unix passwords are currently stored in /etc/shadow."
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "What is the purpose of a cryptographic checksum?",
    "answer": "To check if the message was changed in transit."
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "What is an ASCII parity bit used for?",
    "answer": "An ASCII parity bit is used to ensure that the total number of 1 bits is even (even parity) or odd (odd parity) to detect errors."
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "What is the relationship between k and n in cryptographic checksums?",
    "answer": "The value of k is typically smaller than n, except in unusual circumstances."
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "What is the significance of the number of 1 bits in a byte when using even parity?",
    "answer": "In even parity, if the number of 1 bits is even, it indicates that the character was received correctly."
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "How does odd parity indicate that a character was not received correctly?",
    "answer": "In odd parity, if the number of 1 bits is even, it indicates that the character was not received correctly."
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "What happens to parity when two bits are changed in a transmission?",
    "answer": "If two bits are changed, the parity remains the same, which means the error could go undetected with parity checking."
  },
  {
    "slide_number": 67,
    "type": "flashcard",
    "question": "What is a cryptographic checksum?",
    "answer": "A cryptographic checksum is a function h: A->B where for any x in A, h(x)=y is easy to compute, but it is computationally infeasible to find x in A such that h(x) = y or find any two different documents x, x' in A with the same hash."
  },
  {
    "slide_number": 67,
    "type": "flashcard",
    "question": "What is a collision attack?",
    "answer": "A collision attack is an attempt to find any two different documents x, x' in set A such that they have the same hash, i.e., h(x) = h(x')."
  },
  {
    "slide_number": 67,
    "type": "flashcard",
    "question": "Why is a birthday attack more difficult than a collision attack?",
    "answer": "A birthday attack is more difficult than a collision attack because it involves finding a different document with the same hash as a given target document, where the hash of the target document h(x) is already provided."
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "What is the minimum number of people needed in a room for the probability of any two having the same birthday to be greater than 0.5?",
    "answer": "23"
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "What is the probability of two people having the same birthday?",
    "answer": "1/365"
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "How many people should be in the room (including you) so that the chance that somebody has your birthday is larger than 0.5?",
    "answer": "253"
  },
  {
    "slide_number": 69,
    "type": "flashcard",
    "question": "What is a collision in the context of hash functions?",
    "answer": "A collision occurs when two different inputs, x and x', produce the same hash value, h(x) = h(x')."
  },
  {
    "slide_number": 69,
    "type": "flashcard",
    "question": "How does the number of possible hash values affect the probability of collisions?",
    "answer": "The probability of a collision is inversely proportional to the size of the hash, meaning fewer possible hash values increase the likelihood of collisions."
  },
  {
    "slide_number": 69,
    "type": "calculation",
    "question": "Given 32 files and 8 possible hash values, what is the minimum number of files that share the same hash value?",
    "answer": "At least 4 files share the same hash value, as 32 files divided by 8 hash values equals 4."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "What is a keyed cryptographic checksum?",
    "answer": "A keyed cryptographic checksum requires a cryptographic key, such as using AES in chaining mode to encipher a message and use the last n bits."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "Name an example of a keyless cryptographic checksum released in 2015.",
    "answer": "SHA-3, released by NIST in 2015, is an example of a keyless cryptographic checksum."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "What is HMAC?",
    "answer": "HMAC is a keyless cryptographic checksum that combines a hash function with a key."
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "What is the digest size of the MD5 hash function?",
    "answer": "128 bits"
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "How many rounds does the MD5 hash function have?",
    "answer": "4"
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "What is one use of the MD5 hash function despite it being broken?",
    "answer": "MD5 can be used as a checksum to verify data integrity against unintentional corruption."
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "What is the fixed-length output size of MD5?",
    "answer": "128 bits"
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "Into what size blocks is the input message divided for MD5 processing?",
    "answer": "512-bit blocks"
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "How many 32-bit words are there in each 512-bit block used by MD5?",
    "answer": "Sixteen 32-bit words"
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "How is the 128-bit state divided in the MD5 algorithm?",
    "answer": "Into four 32-bit words, denoted A, B, C, and D."
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "What consists of four similar stages, termed rounds, in MD5 processing?",
    "answer": "The processing of a message block"
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "How many operations are there in each round of MD5 processing?",
    "answer": "16 similar operations"
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "What type of function is used for operations within each round of the MD5 algorithm?",
    "answer": "A non-linear function F"
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "What are the 32-bit words of the state in one iteration of the MD5 compression function?",
    "answer": "A, B, C, D"
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "In the MD5 compression function, what operation does '⋘n' denote?",
    "answer": "A left bit rotation by n places, where n varies for each operation."
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "What does '⊞' denote in the context of the MD5 compression function?",
    "answer": "Addition modulo 2^32."
  },
  {
    "slide_number": 74,
    "type": "flashcard",
    "question": "How many possible functions does the MD5 hash function example have?",
    "answer": "Four possible functions."
  },
  {
    "slide_number": 74,
    "type": "flashcard",
    "question": "How are the functions in the MD5 hash function example utilized?",
    "answer": "A different function is used in each round."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "What is the output size of the SHA-1 hash function?",
    "answer": "The SHA-1 hash function produces a 160-bit (20-byte) hash value."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "Which organization designed the SHA-1 hash function?",
    "answer": "The SHA-1 hash function was designed by the United States National Security Agency (NSA)."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "Is the SHA-1 hash function still widely used despite being cryptographically broken?",
    "answer": "Yes, SHA-1 is still widely used in several security applications and protocols despite being cryptographically broken."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "What are the 32-bit words of the state in one iteration of the SHA-1 compression function?",
    "answer": "A, B, C, D, and E are the 32-bit words of the state."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "What does the symbol '⋘n' denote in the context of the SHA-1 compression function?",
    "answer": "⋘n denotes a left bit rotation by n places."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "In SHA-1, what is the operation represented by '⊞'?",
    "answer": "⊞ denotes addition modulo 2^32."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "What problem does the use of HMAC solve in message authentication?",
    "answer": "HMAC solves the problem of an attacker intercepting a message, changing it, and recomputing the hash."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "What is the defense mechanism used in HMAC?",
    "answer": "The defense mechanism used in HMAC is to create keyed cryptographic checksums from keyless cryptographic checksums."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "What is the formula for computing HMAC?",
    "answer": "The formula for computing HMAC is h(k, m) = h(k' xor opad || h(k' xor ipad || m))."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "What does the strength of HMAC depend on?",
    "answer": "The strength of HMAC depends on the strength of the hash function h."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "Which hash functions are mentioned as vulnerable to attacks that recover partial or full keys in HMAC?",
    "answer": "HMAC-MD4, HMAC-MD5, HMAC-SHA-0, and HMAC-SHA-1 are mentioned as vulnerable."
  },
  {
    "slide_number": 79,
    "type": "flashcard",
    "question": "What are the four main aspects of message integrity in networking?",
    "answer": "1. Content of message has not been altered. 2. Source of message is who/what you think it is. 3. Message has not been replayed. 4. Sequence of messages is maintained."
  },
  {
    "slide_number": 79,
    "type": "flashcard",
    "question": "What is a message digest in the context of networking?",
    "answer": "A message digest is a cryptographic hash function output that provides a unique representation of the original message, used to verify message integrity."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "What is the purpose of the HMAC Message Authentication Code (MAC) alternative mentioned in the slide?",
    "answer": "It authenticates the sender and verifies message integrity without encryption, using a shared secret key."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "What is another name for the alternative to HMAC mentioned in the slide?",
    "answer": "It is also called 'keyed hash'."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "What notation is used for the HMAC alternative described in the slide?",
    "answer": "The notation is MDm = H(s||m) and the message sent is m||MDm."
  }
]
function Flashcard({ flashcard, flipped, setFlipped, animate }) {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
    immediate: !animate, // Disable animation when animate is false
  });

  return (
    <div
      onClick={() => {
        setFlipped(state => !state);
      }}
      className="relative w-full max-w-md h-64 mx-auto my-8 cursor-pointer perspective"
    >
      <a.div
        className={`absolute w-full h-full bg-white text-black flex items-center justify-center 
          backface-hidden border border-gray-400 rounded-lg p-6 shadow-lg`}
        style={{
          opacity: opacity.to(o => 1 - o),
          transform,
        }}
      >
        <p className="text-lg font-semibold">{flashcard.question}</p>
      </a.div>
      <a.div
        className={`absolute w-full h-full bg-gray-100 text-black flex items-center justify-center 
          backface-hidden border border-gray-400 rounded-lg p-6 shadow-lg`}
        style={{
          opacity
                }}
      >
        <p className="text-lg">{flashcard.answer}</p>
      </a.div>
    </div>
  );
}

function Quiz() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [round, setRound] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cards, setCards] = useState(() => shuffleArray(flashcardsData));
  const [flipped, setFlipped] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    if (cards.length > 0 && currentCardIndex >= cards.length) {
      if (missedQuestions.length > 0) {
        // Start a new round with missed questions
        setCards(shuffleArray(missedQuestions));
        setMissedQuestions([]);
        setCurrentCardIndex(0);
        setRound(prevRound => prevRound + 1);
      } else {
        setCompleted(true);
      }
    }
  }, [currentCardIndex, cards, missedQuestions]);

  const handleNext = correct => {
    if (flipped) {
      // Disable animation and flip back to question side
      setAnimate(false);
      setFlipped(false);
    }

    if (!correct) {
      setMissedQuestions(prevMissed => [...prevMissed, cards[currentCardIndex]]);
    }
    setShowAnswer(false);

    // Delay resetting animate to true to ensure immediate flip back
    setTimeout(() => {
      setAnimate(true);
    }, 0);

    setCurrentCardIndex(prevIndex => prevIndex + 1);
  };

  if (completed) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold">Congratulations! You've completed all rounds.</h2>
      </div>
    );
  }

  if (cards.length === 0) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Round {round}</h3>
      <Flashcard
        flashcard={cards[currentCardIndex]}
        flipped={flipped}
        setFlipped={setFlipped}
        animate={animate}
      />
      <div className="mt-4">
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
      </div>
      {showAnswer && (
        <p className="max-w-lg mx-auto mt-4 text-lg">{cards[currentCardIndex].answer}</p>
      )}
      <div className="mt-6">
        <button
          onClick={() => handleNext(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          I got it right
        </button>
        <button
          onClick={() => handleNext(false)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          I got it wrong
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="text-center font-sans">
      <h1 className="text-3xl font-bold mt-8">Flashcard Quiz</h1>
      <Quiz />
    </div>
  );
}

// Helper function to shuffle an array
function shuffleArray(array) {
  let newArray = [...array];
  let currentIndex = newArray.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

export default App;