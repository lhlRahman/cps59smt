"use client";
import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
// Import the JSON data

const flashcardsData = [
  {
    "slide_number": 1,
    "question": "What course and instructor are associated with learning about interesting uses of crypto technology in Fall 2024?",
    "answer": "CPS571 Introduction to Cyber-Security, taught by Dr. Jelena Mišić."
  },
  {
    "slide_number": 2,
    "question": "What are the key elements of a successful protocol for buying tangerines?",
    "answer": "The protocol must be clear and involve the following steps: the customer requests a tangerine, the merchant provides it, the customer pays, and the merchant gives change. All parties must understand and follow these unambiguous steps, ensuring the process ends without endless loops."
  },
  {
    "slide_number": 3,
    "question": "What are potential risks in the basic car-purchase protocol between Alice and Bob?",
    "answer": "Risks include Bob giving a bad check and Alice providing a stolen car with a forged title."
  },
  {
    "slide_number": 4,
    "question": "What role does a trusted third party, like a bank, play in a transaction involving a certified check?",
    "answer": "The bank certifies the check by putting enough of the issuer's money on hold, which helps prevent fraud and protects the recipient by ensuring that the check is backed by sufficient funds."
  },
  {
    "slide_number": 5,
    "question": "What role does the lawyer play in the transaction between Alice and Bob regarding the car sale?",
    "answer": "The lawyer acts as a trusted third party by holding the title and keys from Alice and the check from Bob. The lawyer deposits the check and, after verifying it clears and Bob registers the car, transfers the title to Bob. If the check doesn't clear, the lawyer returns the title to Alice. If Bob can't obtain a clean title, he provides proof to the lawyer to get his money back."
  },
  {
    "slide_number": 6,
    "question": "What role do protocols play in digital security, and what vulnerabilities do they face?",
    "answer": "Protocols, used across the internet, cellular phones, TVs, and smart cards, employ cryptography to secure communications, authenticate identities, ensure fairness, and provide audits. However, they are often subject to various attacks, which can sometimes succeed."
  },
  {
    "slide_number": 7,
    "question": "What are passive and active attacks in the context of protocol security, and what is a man-in-the-middle attack?",
    "answer": "Passive attacks involve listening and learning without altering the communication, but their value is uncertain. Active attacks involve inserting, deleting, or modifying messages. A man-in-the-middle attack occurs when an attacker, like Eve, intercepts and alters messages between two parties, such as Alice and Bob."
  },
  {
    "slide_number": 8,
    "question": "What is a potential vulnerability of a public-key authentication protocol that is secure against passive eavesdropping and active insertion/deletion attacks?",
    "answer": "The protocol may not be secure against a malicious host, which can occur in real life, allowing fraudulent sites (e.g., phony bank sites) to steal user credentials and misuse them."
  },
  {
    "slide_number": 9,
    "question": "Why is it challenging to determine the quality of cryptographic protocols compared to other technologies like mobile phones or cars?",
    "answer": "Unlike technologies where performance can be measured objectively (e.g., speed), cryptographic protocols lack objective measures of quality. They must be examined by experts to identify weaknesses, and even then, vulnerabilities can be overlooked. Multiple expert reviews are necessary to distinguish good cryptography from bad cryptography."
  },
  {
    "slide_number": 10,
    "question": "Why is it preferable to use old and public protocols over new and proprietary ones in network security?",
    "answer": "Old and public protocols like IPSec are preferred because they are extensively scrutinized and tested over time, whereas proprietary protocols may have unknown vulnerabilities, as demonstrated by the flaws found in Microsoft's PPTP in 1998."
  },
  {
    "slide_number": 11,
    "question": "Why is following established methods important in cryptography?",
    "answer": "Following established methods in cryptography provides security, as new methods are often suspect and unverified, similar to trusting a doctor without credentials."
  },
  {
    "slide_number": 12,
    "question": "What are some key concerns addressed by computer security in relation to software and data integrity?",
    "answer": "Computer security addresses ensuring the correctness and integrity of software and data, preventing unauthorized modification, and enforcing licensing rules such as restricting software copying, limiting the number of users and machines, and controlling usage duration."
  },
  {
    "slide_number": 13,
    "question": "What are the key concepts related to protecting information and systems in computing?",
    "answer": "The key concepts include:\n- **Privacy and Confidentiality:** Preventing unauthorized access to sensitive information.\n- **Integrity:** Ensuring data remains as the last authorized modifier left it.\n- **Data Integrity:** Ensuring data hasn't been deleted or altered without permission.\n- **Software Integrity:** Ensuring software programs haven't been altered.\n- **Availability:** Ensuring systems work as expected when needed."
  },
  {
    "slide_number": 14,
    "question": "How do confidentiality, availability, and integrity relate to access control, and why has the need for it evolved over time?",
    "answer": "Confidentiality, availability, and integrity are fundamentally about access control, ensuring only authorized individuals can perform their permitted actions. Initially, computers didn't require strict access control, but as technology evolved, the need for it has become essential beyond just computing, reflecting broader security challenges."
  },
  {
    "slide_number": 15,
    "question": "What are the key components of access control and the specific access permissions in Unix systems?",
    "answer": "Access control involves defining what \"subjects\" (users or processes) can do to \"objects\" (files or resources). It's not just all-or-nothing; there are various access permissions. In Unix systems, the three possible access permissions are read (viewing the file), write (modifying the file), and execute (running the file). A user may have permission to read a file without modifying it, modify it without reading it, or execute it without the ability to read or write it."
  },
  {
    "slide_number": 16,
    "question": "What is the role of 'groups' in Unix access controls, and why are they important?",
    "answer": "In Unix, 'groups' allow all members to share the same set of permissions, simplifying the complex matrix of access controls by reducing the need to individually assign permissions to each user for every file."
  },
  {
    "slide_number": 17,
    "question": "What is an Access Control List (ACL), and what are the pros and cons of using it for managing permissions?",
    "answer": "An Access Control List (ACL) is a way to manage access by associating a list of who has access with each object. It is beneficial for users who can manage their own permissions, but less effective when permissions are centrally managed. While permissions are permanent, ACLs may lack timed validity, and run-time permission checking can be resource-intensive."
  },
  {
    "slide_number": 18,
    "question": "What is the Bell-LaPadula model, and what are its main principles regarding data access in multilevel security systems?",
    "answer": "The Bell-LaPadula model is a security model used in government and military contexts, emphasizing the \"need to know\" principle. It defines clearances for subjects and classifications for objects across levels like Top Secret, Secret, Confidential, and Unclassified. The main rules are \"no read up\" (users cannot read data above their clearance) and \"no write down\" (users cannot write data below their clearance). This prevents illicit information flow, allowing users to write documents they cannot read."
  },
  {
    "slide_number": 19,
    "question": "What are the limitations of the Bell-La Padula model in access control?",
    "answer": "The Bell-La Padula model focuses on mandatory access controls (MAC) and emphasizes confidentiality over other aspects of security. It assumes static data classifications without addressing how they are managed or changed. Additionally, it does not accommodate situations where users need access to unauthorized data, requiring object sanitization in such cases."
  },
  {
    "slide_number": 20,
    "question": "What are the key integrity models and components discussed in CPS 633, and how do they ensure data integrity?",
    "answer": "The key integrity models in CPS 633 include the Chinese Wall model and the Clark-Wilson model. The Chinese Wall model prevents conflicts of interest by managing data from mutually distrustful users. The Clark-Wilson model focuses on data integrity in commercial applications through certification and enforcement rules. Major components ensuring integrity are separation of duty (e.g., developers cannot install programs), separation of function (e.g., developers cannot use unsanitized end-user data), and auditing through careful logging."
  },
  {
    "slide_number": 21,
    "question": "What are some key elements of Clinical Information Systems Security Policy covered in CPS 633?",
    "answer": "Key elements include ensuring patient confidentiality, authenticating records and annotators, preventing unauthorized changes to records, using ORCON for digital rights management (combining MAC and DAC), and implementing Role-Based Access Control (RBAC) where access is determined by the subject's role, not individual identity."
  },
  {
    "slide_number": 22,
    "question": "Why is security often implemented at the operating system or hardware level?",
    "answer": "Implementing security at the lowest layer, such as the operating system or hardware, is effective because it aligns with the Bell-LaPadula policy (no write down and no read up), prevents compromising security by attacking a lower layer, simplifies adding security at the system's core, and often results in faster performance. Operating system security has been a research focus for decades."
  },
  {
    "slide_number": 23,
    "question": "What are the key components of operating system security?",
    "answer": "The key components of operating system security include the reference monitor, which halts processes to determine if OS calls should be allowed, the trusted computing base, which encompasses all protection mechanisms in the computer responsible for enforcing security policies, and the secure kernel, which implements the reference monitor concept within the trusted computing base."
  },
  {
    "slide_number": 24,
    "question": "What are the limitations of formal security models in software development?",
    "answer": "Formal security models offer theoretical frameworks but are limited in practice. They cannot prove a system's security properties and only assure security against attackers who adhere to the model. Effective attackers often devise new methods beyond these models, thus real products typically integrate ideas from formal models without fully relying on them."
  },
  {
    "slide_number": 25,
    "question": "What is the primary focus of Chapter 10 in \"Computer Security: The Art and Science\" by M. Bishop?",
    "answer": "Chapter 10 covers key concepts and advancements in technology related to cyber-security, as introduced in CPS571 by Dr. Jelena Mišić."
  },
  {
    "slide_number": 26,
    "question": "What is a potential risk when using symmetric key encryption for message authentication?",
    "answer": "The risk is that if the key is shared with multiple people, it becomes difficult to verify the true sender of the message, as anyone with the key can create an authentic-looking message."
  },
  {
    "slide_number": 27,
    "question": "What is a Message Authentication Code (MAC) and what is its primary purpose?",
    "answer": "A MAC uses a shared secret key, similar to symmetric encryption algorithms, and employs a hash function to verify message integrity, indicating if the message has been tampered with, but it does not protect privacy."
  },
  {
    "slide_number": 28,
    "question": "What are one-way hash functions and their key characteristics?",
    "answer": "One-way hash functions use a one-way function to produce a message digest (fingerprint) that is simple to compute but infeasible to reverse. The digest has a fixed length, regardless of the message length. Cryptographic hash functions are faster in software than encryption algorithms like DES, and their code is widely available."
  },
  {
    "slide_number": 29,
    "question": "How has the storage of Unix passwords evolved over time to enhance security?",
    "answer": "Initially, Unix passwords were stored in plain text in /etc/passwd. Later, they stored hashed passwords instead. To further enhance security, a 'salt' (random string) was added to the password before hashing. Currently, password hashes are stored in /etc/shadow, although accessing this file typically requires significant system access."
  },
  {
    "slide_number": 30,
    "question": "What is a cryptographic checksum and how is it used in data transmission?",
    "answer": "A cryptographic checksum is a mathematical function that generates a set of k bits from a set of n bits (where k ≤ n) to verify if a message was altered during transit. An example is the ASCII parity bit, where the 8th bit ensures even parity (even number of 1 bits) or odd parity (odd number of 1 bits)."
  },
  {
    "slide_number": 31,
    "question": "How can parity be used to check if the character \"10111101\" was received correctly when using even and odd parity?",
    "answer": "For even parity, \"10111101\" (6 ones) is correct as it maintains even parity. For odd parity, it's incorrect because it has an even number of ones. Two bits would need to change to preserve parity if garbled."
  },
  {
    "slide_number": 32,
    "question": "What are cryptographic checksums, and how do collision and birthday attacks differ in their computational infeasibility?",
    "answer": "A cryptographic checksum is a function h: A->B, easy to compute for any x∈A but infeasible to reverse (find x from y∈B). Collision attacks are infeasible attempts to find two different documents x, x'∈A with the same hash (h(x) = h(x')). Birthday attacks, more difficult than collision attacks, involve finding a different document with the same hash as a given target document."
  },
  {
    "slide_number": 33,
    "question": "What is the difference between a collision attack and a birthday attack in terms of probabilities and required number of people?",
    "answer": "In a collision attack, 23 people are needed for a probability greater than 0.5 that any two share a birthday. In a birthday attack, 253 people are needed for a probability greater than 0.5 that someone shares your specific birthday."
  },
  {
    "slide_number": 34,
    "question": "What is a collision in the context of cryptographic hash functions, and how does the size of the hash affect the probability of a collision?",
    "answer": "A collision occurs when two different inputs, x and x', produce the same hash value (h(x) = h(x')). The probability of a collision is inversely proportional to the size of the hash; larger hash sizes reduce the likelihood of collisions. For example, with 32 files and only 8 possible hash values, at least one hash value will correspond to 4 files."
  },
  {
    "slide_number": 35,
    "question": "What is the difference between keyed and keyless cryptographic checksums, and can you give examples of each?",
    "answer": "Keyed cryptographic checksums require a cryptographic key to generate the checksum. An example is AES in chaining mode, which uses a key to encipher the message and derives the checksum from the last n-bits. Keyless cryptographic checksums do not require a key. Examples include SHA-512 and SHA-3. HMAC is a combination of a hash function with a key, used for keyless cryptographic checksums."
  },
  {
    "slide_number": 36,
    "question": "What is MD5, and what are its key characteristics?",
    "answer": "MD5 is a hash function designed by Ronald Rivest, with a digest size of 128 bits and a block size of 512 bits. It uses the Merkle-Damgård construction with 4 rounds. Although broken, it is still studied for its importance and can be used as a checksum to verify data integrity against unintentional corruption."
  },
  {
    "slide_number": 37,
    "question": "What is the process of the MD5 algorithm in handling a message?",
    "answer": "MD5 processes a variable-length message into a 128-bit fixed-length output by breaking the message into 512-bit blocks. The message is padded to be divisible by 512. The algorithm operates on a 128-bit state (four 32-bit words: A, B, C, D) initialized to fixed constants. Each 512-bit block modifies the state through four stages, each with 16 operations based on a non-linear function F."
  },
  {
    "slide_number": 38,
    "question": "What are the key components and operations involved in one iteration of the MD5 compression function?",
    "answer": "In one iteration of the MD5 compression function, the key components are 32-bit words A, B, C, D of the state, a nonlinear function F, and operations involving left bit rotation (⋘n) and addition modulo 2^32 (⊞). Each iteration uses a 32-bit message block (Mi) and a unique 32-bit constant (Ki)."
  },
  {
    "slide_number": 39,
    "question": "How many different functions are used in each round of the MD5 hash function?",
    "answer": "There are four possible functions, with a different one used in each round of the MD5 hash function."
  },
  {
    "slide_number": 40,
    "question": "What is SHA-1, and why is it significant in cryptography despite being broken?",
    "answer": "SHA-1 (Secure Hash Algorithm 1) is a hash function producing a 160-bit hash value, known as a message digest, typically rendered as 40 hexadecimal digits. Designed by the U.S. NSA, it is a Federal Information Processing Standard. Although cryptographically broken, SHA-1 remains widely used in security applications and protocols like TLS, SSL, PGP, SSH, S/MIME, and IPsec. It features a digest size of 160 bits, block size of 512 bits, and 80 rounds."
  },
  {
    "slide_number": 41,
    "question": "What are the key components and operations involved in one iteration of the SHA-1 compression function?",
    "answer": "In one iteration of the SHA-1 compression function, the components include 32-bit words A, B, C, D, and E of the state, a nonlinear function F, the expanded message word Wt, and the round constant Kt. The operations involve a left bit rotation denoted by ⋘n and addition modulo 2^32 denoted by ⊞. The function F and the rotation value n vary for each operation."
  },
  {
    "slide_number": 42,
    "question": "What is the primary defense mechanism used in HMAC to prevent message tampering by attackers?",
    "answer": "HMAC defends against message tampering by using a keyed cryptographic checksum, which involves creating a hash using a cryptographic key (k') and constants (ipad and opad) to secure the data. The process uses exclusive or (XOR) operations and concatenation with the message, ensuring the hash cannot be recomputed by an attacker without the key."
  },
  {
    "slide_number": 43,
    "question": "What determines the strength of HMAC and what are some vulnerabilities associated with it?",
    "answer": "The strength of HMAC depends on the strength of the hash function used. Vulnerabilities exist where attacks on HMAC-MD4, HMAC-MD5, HMAC-SHA-0, and HMAC-SHA-1 can recover partial or full keys."
  },
  {
    "slide_number": 44,
    "question": "What are the key aspects of message integrity in networking?",
    "answer": "Message integrity ensures that: 1) the content hasn't been altered, 2) the source is verified, 3) the message hasn't been replayed, and 4) the sequence of messages is maintained."
  },
  {
    "slide_number": 45,
    "question": "What is an alternative to HMAC for ensuring message authentication and integrity without encryption, and how is it represented?",
    "answer": "An alternative to HMAC is the \"keyed hash,\" which uses a shared secret key for authentication and integrity. It is represented as MDm = H(s||m), and the message is sent as m||MDm."
  },
  {
    "slide_number": 46,
    "question": "Who teaches the CPS571 Introduction to Cyber-Security course in Fall 2024?",
    "answer": "Dr. Jelena Mišić"
  },
  {
    "slide_number": 47,
    "question": "Who were the key contributors to the development of public-private key encryption?",
    "answer": "Diffie, Hellman, with help from Merkle."
  },
  {
    "slide_number": 48,
    "question": "How does public-key cryptography ensure secure communication between Alice and Bob?",
    "answer": "Alice encrypts a message using Bob's public key (known to everyone), and Bob decrypts it using his private key (known only to him), ensuring only Bob can read the message."
  },
  {
    "slide_number": 49,
    "question": "What are the key security services provided by encryption using a private-public key pair?",
    "answer": "1. **Confidentiality**: Ensures that only the owner of the private key can read the text enciphered with the public key.  \n2. **Authentication**: Verifies that text enciphered with the private key was generated by the owner of the private key.  \n3. **Integrity**: Prevents undetectable changes to enciphered letters without the private key.  \n4. **Non-Repudiation**: Confirms that a message enciphered with the private key came from someone who knew it."
  },
  {
    "slide_number": 50,
    "question": "What are the key requirements of public-key cryptography?",
    "answer": "Public-key cryptography requires:  \n1. Simple generation of private-public key pairs.  \n2. Symmetric encryption, allowing encryption with one key and decryption with the other.  \n3. Computational infeasibility of deriving the private key from the public key.  \n4. Infeasibility of deciphering messages with only one key."
  },
  {
    "slide_number": 51,
    "question": "What are some key developments and trends in public-key cryptographic algorithms?",
    "answer": "Public-key cryptographic algorithms began with Diffie and Hellman's idea and key exchange algorithm. RSA, developed by Rivest, Shamir, and Adleman in 1977, was initially the most widely implemented. Over time, key sizes have increased (e.g., 128, 512 bits). Elliptic-Curve Cryptography (ECC) offers more security with smaller key sizes and is widely used today, alongside other algorithms like ElGamal."
  },
  {
    "slide_number": 52,
    "question": "What are the possible applications of encryption and key exchange in secure communications?",
    "answer": "Traditional encryption uses the recipient's public key for secure messaging, while key exchange involves generating and exchanging a session key for faster symmetric encryption, enhancing performance as symmetric encryption is quicker than public/private key encryption."
  },
  {
    "slide_number": 53,
    "question": "**Q:** What are some challenges and solutions related to public key distribution?  \n**A:** Challenges include verifying the authenticity of a public key (e.g., ensuring Bob's key is truly his). Solutions involve physical distribution, authentication mechanisms, and using a trusted or certification authority.",
    "answer": ""
  },
  {
    "slide_number": 54,
    "question": "What are key aspects of message authentication and how can it be achieved?",
    "answer": "Message authentication ensures the message is from the claimed source, unchanged, and sent at a specific time or sequence. It can be achieved through conventional encryption (shared key) or creating an authentication tag like HMAC."
  },
  {
    "slide_number": 55,
    "question": "How is public-key cryptography used for authentication, and what is a key rule to remember?",
    "answer": "In authentication, Alice encrypts a message with her private key, and Bob decrypts it using Alice's public key to verify it came from her. A key rule to remember is to always sign the message first, then encipher it."
  },
  {
    "slide_number": 56,
    "question": "**Q: How does double encryption with private and public keys support both security and authentication, and what could happen if the order of encryptions is reversed?**",
    "answer": "**A: Double encryption supports security and authentication by having Alice encrypt a message with her private key and then Bob’s public key. Bob decrypts first with his private key, then Alice's public key, ensuring the message is intended for Bob and from Alice. Reversing this order could compromise authentication, as anyone could decrypt with Bob's public key first, losing the assurance it came specifically from Alice.**"
  },
  {
    "slide_number": 57,
    "question": "What is the process for Alice to sign a message using a digital signature, and how does Bob verify it?",
    "answer": "Alice creates a digital signature by taking a one-way hash of the message and encrypting the hash with her private key. Bob verifies it by decrypting the hash with Alice's public key to confirm it's from her and recalculating the hash to ensure the message hasn't been tampered with."
  },
  {
    "slide_number": 58,
    "question": "What are the challenges in generating random numbers and how do natural and artificial random numbers differ?",
    "answer": "Generating random numbers is complex. Natural random numbers, like those from radioactive decay, are truly random but scarce. Artificial random numbers can be generated in many ways but require careful validation to ensure quality and avoid negative outcomes."
  },
  {
    "slide_number": 59,
    "question": "What are the considerations for key length in cryptography, and how do different types of attacks relate to it?",
    "answer": "Key length is crucial in cryptography, with longer keys generally offering more security. However, a long key isn't always better. Brute-force attacks involve checking all possible combinations, e.g., 40-bit keys have 2^40 combinations. Public-key cryptography uses longer keys like 1024 or 2048 bits for RSA, while elliptic curve cryptography uses shorter keys. Dictionary attacks attempt common words first and apply to any algorithm."
  },
  {
    "slide_number": 60,
    "question": "What is the primary focus of computer security?",
    "answer": "Protecting computer systems and data from unauthorized access, damage, or theft."
  },
  {
    "slide_number": 61,
    "question": "What is the primary purpose of public key cryptography and how do the public and private keys function in ensuring confidentiality and integrity?",
    "answer": "Public key cryptography is used to ensure confidentiality and integrity of messages. For confidentiality, a message is encrypted with the recipient's public key and can only be decrypted with their private key. For integrity/authentication, a message is encrypted with the sender's private key and can be verified by anyone using the sender's public key."
  },
  {
    "slide_number": 62,
    "question": "What is the key requirement for public key encryption algorithms, and can you give examples?",
    "answer": "Public key encryption algorithms require a public key \\( K^+ \\) and a private key \\( K^- \\) such that it is infeasible to compute the private key from the public key. Examples include RSA (Rivest-Shamir-Adleman), El-Gamal, and the knapsack algorithm."
  },
  {
    "slide_number": 63,
    "question": "**Q: What are the key properties of modular arithmetic, and how do they apply to calculations, such as (a mod n)^d mod n? Provide an example with a = 14, n = 10, and d = 2.**",
    "answer": "**A: Key properties of modular arithmetic include:**\n\n- \\((a \\mod n) + (b \\mod n) \\equiv (a+b) \\mod n\\)\n- \\((a \\mod n) - (b \\mod n) \\equiv (a-b) \\mod n\\)\n- \\((a \\mod n) \\times (b \\mod n) \\equiv (a \\times b) \\mod n\\"
  },
  {
    "slide_number": 64,
    "question": "What role does modular arithmetic play in cryptography, and what are some related computational problems?",
    "answer": "Modular arithmetic is essential in cryptography for managing computation sizes and memory use. It helps solve difficult problems like the discrete logarithm problem, which involves finding \\( x \\) such that \\((a \\cdot x) \\mod n = 1\\) or \\(a^x \\mod n = S\\). Other challenging problems include factorization and finding the greatest common divisor for large numbers."
  },
  {
    "slide_number": 65,
    "question": "What conditions must be met for the inverse of a number \\(a\\) modulo \\(n\\) to exist, and how can it be found?",
    "answer": "The inverse of \\(a\\) modulo \\(n\\) exists if \\(a\\) and \\(n\\) are relatively prime (i.e., they have no common factors other than 1). To find it, solve the equation \\((a \\cdot x) \\equiv 1 \\pmod{n}\\). For example, the inverse of 4 modulo 7 is 2, since \\((4 \\cdot 2) \\equiv 1 \\pmod{7}\\)."
  },
  {
    "slide_number": 66,
    "question": "What is Euler's totient function, and how is it calculated for a number that is the product of two primes?",
    "answer": "Euler's totient function, \\( \\phi(n) \\), counts the positive integers less than \\( n \\) that are relatively prime to \\( n \\). For a number \\( n = pq \\), where \\( p \\) and \\( q \\) are primes, \\( \\phi(n) = (p-1)(q-1) \\)."
  },
  {
    "slide_number": 67,
    "question": "What does Fermat's Little Theorem state about discrete logarithms when \\( m \\) is prime and \\( a \\) is not a multiple of \\( m \\)?",
    "answer": "Fermat's Little Theorem states that \\( a^{m-1} \\equiv 1 \\mod m \\). For example, \\( 5^6 \\equiv 1 \\mod 7 \\). This implies \\( a^{-1} \\equiv a^{m-2} \\mod m \\)."
  },
  {
    "slide_number": 68,
    "question": "What is Euler's generalization of Fermat's Little Theorem, and how is the inverse of a number modulo n computed?",
    "answer": "Euler's generalization of Fermat's Little Theorem states that if gcd(a, n) = 1, then \\( a^{f(n)} \\equiv 1 \\pmod{n} \\), where \\( f(n) \\) is the Euler's totient function. The inverse of a number \\( a \\) modulo \\( n \\) is computed as \\( a^{-1} \\equiv a^{f(n)-1} \\pmod{n} \\). For example, the inverse of 5 modulo 7 is \\("
  },
  {
    "slide_number": 69,
    "question": "What is the Diffie-Hellman algorithm, and what mathematical principle is it based on?",
    "answer": "The Diffie-Hellman algorithm is a symmetric key exchange protocol that computes a common, shared key between two parties. It is based on the discrete logarithm problem and requires understanding number theory, specifically properties like \\((ab) \\mod n = [(a \\mod n)(b \\mod n)] \\mod n\\) and \\(a^k \\mod n = (a \\mod n)^k \\mod n\\)."
  },
  {
    "slide_number": 70,
    "question": "What are the key steps in the Diffie-Hellman algorithm as used by Alice and Bob?",
    "answer": "Alice and Bob choose a generator \\( g \\) and a prime number \\( p \\) (both public). They each select private keys \\( k_a \\) and \\( k_b \\), known only to themselves. They compute their public keys as \\( K_a = g^{k_a} \\mod p \\) and \\( K_b = g^{k_b} \\mod p \\). It is computationally infeasible to determine \\( k_a \\) and \\( k_b \\) from \\( K_a, K_b, g, \\) and \\( p \\) as \\( p \\) grows"
  },
  {
    "slide_number": 71,
    "question": "How do Alice and Bob establish a shared secret key using the Diffie-Hellman Algorithm?",
    "answer": "Alice and Bob each choose private keys (ka and kb) and compute their public keys (Ka = g^ka mod p and Kb = g^kb mod p). They exchange public keys and compute the shared secret key as Kshared = g^(ka*kb) mod p using each other's public keys."
  },
  {
    "slide_number": 72,
    "question": "How is the shared key calculated in the Diffie-Hellman algorithm example with p = 53 and g = 17, where Alice's secret key is 5 and Bob's secret key is 7?",
    "answer": "Alice computes the shared key as \\(6^5 \\mod 53 = 38\\), and Bob computes it as \\(40^7 \\mod 53 = 38\\). Both results match, confirming the shared key is 38, which can be used in symmetric key encryption."
  },
  {
    "slide_number": 73,
    "question": "Who was Taher El Gamal, and what is he known for in the context of cryptography?",
    "answer": "Taher El Gamal, a PhD student of Martin Hellman at Stanford University, is known for developing the El Gamal Cryptosystem."
  },
  {
    "slide_number": 74,
    "question": "**Q: What is the El Gamal Cryptosystem based on, and what makes it secure as the prime number \\( p \\) increases?**",
    "answer": "**A: The El Gamal Cryptosystem is based on the discrete logarithm problem. Its security increases as the prime number \\( p \\) grows larger because finding the integer \\( k \\) such that \\( a = g^k \\mod p \\) becomes computationally infeasible for large \\( p \\).**"
  },
  {
    "slide_number": 75,
    "question": "How are the public and private keys generated in the given algorithm?",
    "answer": "To generate keys, choose a prime \\( p \\) such that \\( p-1 \\) has a large factor. Select a generator \\( g \\) where \\( 1 < g < p \\) and a private key \\( k_{\\text{priv}} \\) where \\( 1 < k_{\\text{priv}} < p-1 \\). Compute \\( y = g^{k_{\\text{priv}}} \\mod p \\). The public key is \\( k_{\\text{pub}} = (p, g, y) \\) and the private key is \\( k_{\\text{priv}} \\)."
  },
  {
    "slide_number": 76,
    "question": "What are the components of Alice's public key in the given cryptographic example?",
    "answer": "Alice's public key components are the prime number \\( p = 262643 \\), the generator \\( g = 9563 \\), and the computed value \\( y = 27459 \\), forming the public key \\( k_{pub} = (262643, 9563, 27459) \\)."
  },
  {
    "slide_number": 77,
    "question": "How is a message enciphered and deciphered using the given method, and what ensures the security of the encipherment process?",
    "answer": "To encipher a message \\( m \\), choose a random integer \\( k \\) (relatively prime to \\( p-1 \\)), compute \\( c_1 = g^k \\mod p \\) and \\( c_2 = m \\cdot y^k \\mod p \\). The ciphertext is \\( c = (c_1, c_2) \\). For deciphering, compute \\( m' = c_2 \\cdot c_1^{-k_{\\text{priv}}} \\mod p \\), which simplifies to \\( m"
  },
  {
    "slide_number": 78,
    "question": "How does Bob encrypt the message \"PUPPIESARESM ALL\" using the given parameters in the example encryption method?",
    "answer": "Bob represents each character as a number (A=00, Z=25, space=26) and forms blocks of 3 characters. For encryption, he calculates c1 and c2 using chosen k values and the formulae: c1 = g^k mod p and c2 = (message block * kpub^k) mod p. Using k=5 for the first block, he computes (c1,1= 15653, c1,2= 923). Continuing similarly for other blocks, the enciphered message is (156"
  },
  {
    "slide_number": 79,
    "question": "How does Alice decrypt the received message blocks using the given parameters in an example decryption process?",
    "answer": "Alice uses the formula \\( m = c_2 \\times c_1^{-k_{\\text{priv}}} \\mod p \\) for decryption. For each block like \\((c_1, c_2)\\), she computes the message \\( m \\). For example, for the first block \\((923, 15653)\\), she calculates \\( (923 \\times 15653^{-3632}) \\mod 262643 = 152015 \\). Repeating this for each block gives the full message \"PUPPIESARESMALL\"."
  },
  {
    "slide_number": 80,
    "question": "What is a key feature of the El Gamal encryption scheme that helps prevent replay attacks, and what vulnerability arises if the same random integer is used twice?",
    "answer": "The El Gamal encryption scheme introduces randomness with a random number \\( k \\), leading to different ciphertexts for the same message, which helps prevent replay attacks. However, if the same integer \\( k \\) is used twice, and an attacker has the plaintext of one message, they can easily decipher the second message by comparing ciphertext components and exploiting the known parameters \\( p \\) and \\( g \\)."
  },
  {
    "slide_number": 81,
    "question": "What are the key challenges that the Rivest, Shamir, Adleman (RSA) algorithm relies on for security?",
    "answer": "The RSA algorithm's security relies on the difficulty of factoring large integers and solving the discrete logarithm problem."
  },
  {
    "slide_number": 82,
    "question": "How does Euler's generalization of Fermat’s Little Theorem apply to simplify the expression \\( x^y \\mod n \\)?",
    "answer": "Euler's generalization states that if \\(\\gcd(x, n) = 1\\), then \\( x^{\\phi(n)} \\equiv 1 \\mod n \\). Therefore, \\( x^y \\mod n \\) can be simplified to \\( x^{y \\mod \\phi(n)} \\mod n \\), since \\( x^{k\\phi(n) + y \\mod \\phi(n)} \\equiv x^{y \\mod \\phi(n)} \\mod n \\)."
  },
  {
    "slide_number": 83,
    "question": "What are the key steps involved in the RSA algorithm for encryption and decryption?",
    "answer": "In the RSA algorithm, choose two large secret primes \\( p \\) and \\( q \\), compute \\( n = pq \\) and \\( \\phi(n) = (p-1)(q-1) \\). Select a public key \\( e \\) such that \\( e \\) is relatively prime to \\( \\phi(n) \\). Compute the private key \\( d \\) where \\( ed \\mod \\phi(n) = 1 \\). The public key is \\( (e, n) \\) and the private key is \\( d \\). For encryption, divide the message into blocks \\( m < n"
  },
  {
    "slide_number": 84,
    "question": "What are the steps to encrypt and decrypt a bit pattern using RSA with given values (n, e) and (n, d)?",
    "answer": "To encrypt a bit pattern, m, using RSA, compute c = m^e mod n (remainder when m^e is divided by n). To decrypt the received bit pattern, c, compute m = c^d mod n (remainder when c^d is divided by n)."
  },
  {
    "slide_number": 85,
    "question": "**Question:** What is an important property of RSA encryption regarding the use of public and private keys?",
    "answer": "**Answer:** An important property of RSA is that a message encrypted with the public key can be decrypted with the private key, and vice versa. Specifically, if you encrypt a message \\( m \\) using the public key first and then decrypt it with the private key, you get the original message back: \\( K_{priv}(K_{pub}(m)) = m \\). Similarly, if you encrypt with the private key and decrypt with the public key, you also retrieve the original message: \\( K_{pub}(K_{priv}(m)) = m \\)."
  },
  {
    "slide_number": 86,
    "question": "**Q:** How does Alice use RSA encryption and decryption to securely receive a message from Bob?  \n**A:** Alice generates public and private keys using p=181, q=1451 (n=262631, φ(n)=261000). She chooses a public key \\(e_a=154993\\) and calculates the private key \\(d_a=95857\\). Bob encrypts his message using Alice's public key and sends the ciphertext. Alice decrypts it with her private key.",
    "answer": ""
  },
  {
    "slide_number": 87,
    "question": "How does Alice decrypt a message using her private key in the confidentiality example from Fall 2024 Cp 571?",
    "answer": "Alice uses her private key, \\(d = 95857\\), to decrypt numerical values by calculating each value raised to the power of \\(d\\) modulo 262631. This process translates the numbers into letters, revealing the message \"PUPPIES ARE SMALL.\" Only Alice can decrypt the message as she is the only one with access to her private key."
  },
  {
    "slide_number": 88,
    "question": "How does Alice ensure message integrity and authentication when sending \"PUPPIESARESMALL\" to Bob using cryptographic keys?",
    "answer": "Alice encrypts the message using her private key (da= 95857), resulting in the encrypted output: 072798 259757 256449 089234 037974. Bob then uses Alice's public key (ea= 154993) to decipher the message, ensuring it is from Alice and unchanged."
  },
  {
    "slide_number": 89,
    "question": "How does Alice send a message with both confidentiality and integrity/authentication using encryption keys?",
    "answer": "Alice first encrypts the message \"PUPPIESARESMALL\" using her private key (da = 95857) for integrity/authentication, and then encrypts the result with Bob's public key (eb = 45593) for confidentiality. The encrypted message is sent as: 249123 166008 146608 092311 096768."
  },
  {
    "slide_number": 90,
    "question": "How does Bob ensure both confidentiality and integrity/authentication when receiving a message from Alice in the Fall 2024 Cp 571 example?",
    "answer": "Bob first deciphers the message using his private key (db=235457) and then with Alice's public key (ea=154993), applying the operations in reverse order to decrypt the received numbers. This process confirms both confidentiality and integrity/authentication, resulting in the message \"PUPPIESARESMALL.\""
  },
  {
    "slide_number": 91,
    "question": "Why are single characters not encrypted separately in practice, and how are messages typically secured to prevent re-shuffling and other attacks?",
    "answer": "Single characters are not encrypted separately because they can be broken like classical substitution ciphers. Instead, messages are divided into blocks slightly smaller than n (in bits), padded with random bits, and assigned sequence numbers to prevent re-shuffling. This helps secure the message against attacks, including RSA attacks, where guessing (p-1)(q-1) is as difficult as factoring n = pq."
  },
  {
    "slide_number": 92,
    "question": "Why is RSA not typically used for encrypting large amounts of data, and how is it used in practice instead?",
    "answer": "RSA is computationally intensive and much slower than symmetric encryption methods like DES/AES, which are at least 100 times faster. In practice, RSA is used to establish a secure connection and exchange a symmetric session key (KS) between parties like Bob and Alice. Once the session key is exchanged, they use symmetric key cryptography for encrypting data, which is more efficient for large amounts of data."
  },
  {
    "slide_number": 93,
    "question": "What is a notable resource for learning about interesting uses of cryptography in technology, as discussed in CPS571 Introduction to Cyber-Security?",
    "answer": "\"Applied Cryptography\" by Bruce Schneier, second edition, is a key resource for understanding the interesting uses of cryptography in technology, as highlighted in CPS571 Introduction to Cyber-Security."
  },
  {
    "slide_number": 94,
    "question": "What is the generalization of RSA called, and how does it work with multiple keys?",
    "answer": "The generalization of RSA is called Multiple Key RSA (MK-RSA), which uses multiple keys for encryption and decryption. In MK-RSA, the product of keys (K1 * K2 * ... * Kt) satisfies the equation K1 * K2 * ... * Kt mod f(n) = 1, where f(n) = (p-1)(q-1). This allows for flexible encryption and decryption schemes, such as encrypting a message with some keys and decrypting it with others. It is useful in multi-signature scenarios."
  },
  {
    "slide_number": 95,
    "question": "How does the multi-signature scheme using RSA-MK work with keys K1, K2, and K3?",
    "answer": "In the RSA-MK multi-signature scheme, a trusted third party verifies signatures using the public key K3. Alice signs the document M with her key K1, creating M' = M^K1 mod n, and sends it to Bob. Bob recovers M using K2 and K3, and can add his own signature, resulting in M\" = M'^K2 mod n. Anyone can verify both signatures using the public key K3. This scheme relates to the group signature concept."
  },
  {
    "slide_number": 96,
    "question": "What are the requirements for a timestamp service provided by a trusted third party like Trent?",
    "answer": "The requirements are: 1) The data must be timestamped independently of its physical medium. 2) Any changes to the document must be detectable. 3) It's impossible to timestamp a document with a date/time other than the current one."
  },
  {
    "slide_number": 97,
    "question": "What are the issues associated with using a trusted third party like Trent for timestamping documents?",
    "answer": "The issues include privacy concerns since the document, even if encrypted, must be stored in Trent's database, which can become large and waste bandwidth. Additionally, if someone like Trent’s student Trudy colludes with Alice, they can falsify the timestamp."
  },
  {
    "slide_number": 98,
    "question": "How does linking timestamps improve the security of a one-way hash solution in document verification?",
    "answer": "Linking timestamps from different clients creates a chronological sequence, preventing collusion by ensuring that Alice's hash is sandwiched between earlier and later requests, thus embedding it in a tamper-evident timeline."
  },
  {
    "slide_number": 99,
    "question": "What is a subliminal channel, and why do Alice and Bob need to use one while communicating under Walter's supervision?",
    "answer": "A subliminal channel is a covert communication method used in full view of an observer. Alice and Bob need to use it to coordinate secretly without Walter detecting their true messages, despite the risk of deception by Walter who can read and potentially alter their communications."
  },
  {
    "slide_number": 100,
    "question": "What is a subliminal channel in digital communication, and how can it be used to secretly convey information?",
    "answer": "A subliminal channel in digital communication is a method of covertly embedding information, such as using the number of words in a sentence to represent binary data (odd for \"1\" and even for \"0\"). In the context of digital signatures, Alice can create an innocuous message and sign it using a secret key shared with Bob, embedding the subliminal message within the signature. Walter, who relays the message, cannot detect the hidden information, but Bob can extract it using the shared secret key."
  },
  {
    "slide_number": 101,
    "question": "What is required for implementing a subliminal channel in digital signature algorithms like El Gamal?",
    "answer": "Detailed knowledge of the actual digital signature algorithm is required for implementing a subliminal channel, and this is deferred to a later occasion."
  },
  {
    "slide_number": 102,
    "question": "What is a group signature and what are its key requirements in ensuring privacy?",
    "answer": "A group signature allows only members of a group to sign messages, enabling verification of the signature's validity without revealing the individual signer. In case of a dispute, the signature can be traced back to the signer. This is useful in contexts like controlling resource use in companies or sending anonymous warnings in vehicular networks."
  },
  {
    "slide_number": 103,
    "question": "How does a group signature with a trusted third party, like Trent, ensure anonymity and accountability within a group?",
    "answer": "Trent generates public/private key pairs and gives each group member a unique list of private keys. The master list of public keys is published in random order. Members sign with a private key from their list, and verification uses the master list. In disputes, Trent can match public keys to members, ensuring both anonymity and accountability."
  },
  {
    "slide_number": 104,
    "question": "What is an undeniable non-transferable digital signature, and how does it ensure software authenticity for legal buyers?",
    "answer": "An undeniable non-transferable digital signature allows verification only with the signer's consent, ensuring software authenticity by restricting verification to legal buyers. The process involves: Alice presenting a signature, Bob sending a random number, Alice calculating with her private key, and Bob confirming the result—ensuring only valid signatures are verified."
  },
  {
    "slide_number": 105,
    "question": "How does Alice sign and Bob verify a message using an undeniable nontransferable digital signature with large prime numbers?",
    "answer": "Alice signs a message \\( m \\) by computing \\( z = m \\times x \\mod p \\), where \\( x \\) is her private key. Bob verifies the signature by generating random numbers \\( a \\) and \\( b < p \\), sending them to Alice, and receiving \\( d = c \\times t \\mod p \\) back, where \\( c = z \\times a \\times (g^x)^b \\mod p \\) and \\( t = x^{-1} \\mod p \\). Bob confirms the signature if \\( d = m \\times a"
  },
  {
    "slide_number": 106,
    "question": "What are the key rules for the remote coin flipping and guessing game between Alice and Bob?**",
    "answer": "1) Alice must flip the coin before Bob guesses, 2) Alice cannot re-flip the coin after Bob's guess, and 3) Bob must not know the coin's outcome before guessing. Cryptography can be used to implement this."
  },
  {
    "slide_number": 107,
    "question": "How does the coin flipping scheme using a hash function work between Alice and Bob, and what ensures its security?",
    "answer": "In the scheme, Alice and Bob agree on a hash function f. Alice chooses a random number x, computes y=f(x), and sends y to Bob. Bob guesses if x is even or odd. If correct, the flip is 'heads'; otherwise, 'tails.' Alice reveals the result and x; Bob verifies y=f(x). The scheme's security relies on the hash function; if Alice finds both even and odd x with the same hash, she can cheat."
  },
  {
    "slide_number": 108,
    "question": "How does cryptographic coin flipping work using a commutative algorithm like RSA with identical moduli?",
    "answer": "In cryptographic coin flipping, Alice and Bob each generate public and private keys. Alice creates two random strings as heads and tails, encrypts them with her public key, and sends them to Bob. Bob randomly selects one, encrypts it with his public key, and sends it back. Alice decrypts it with her private key and sends it back to Bob, who finally decrypts it with his private key to reveal the result. This process ensures neither party can predict or influence the outcome, maintaining fairness."
  },
  {
    "slide_number": 109,
    "question": "How does the cryptographic coin flipping protocol ensure fairness and prevent cheating between Alice and Bob?",
    "answer": "The protocol ensures fairness as both Alice and Bob decrypt the coin flip result using their private keys, revealing the outcome. They then exchange key pairs, allowing each to verify the other's honesty. This self-enforcing protocol requires no third party, as cheating is immediately detectable, and it can also be used for key exchange, with each bit generated independently."
  },
  {
    "slide_number": 110,
    "question": "**Question:** How does the \"Mental Poker\" protocol ensure fair play when Alice and Bob play poker over a distance using encryption?",
    "answer": "**Answer:** In \"Mental Poker,\" Alice encrypts card messages with her public key and sends them to Bob. Bob randomly selects and encrypts some with his public key, sending them back. Alice decrypts these, and Bob decrypts them to see his hand. Bob then sends more encrypted messages for Alice to decrypt to see her hand. At the end, both reveal their cards and key pairs to verify no cheating occurred."
  },
  {
    "slide_number": 111,
    "question": "How do Alice, Bob, and Carol securely exchange cards in a mental poker game using public-key cryptography?",
    "answer": "Each player generates public/private key pairs. Alice encrypts 52 card messages with her public key and sends them to Bob. Bob randomly encrypts 5 cards with his public key and returns them to Alice, then sends the rest to Carol. Carol repeats the encryption process for her selected cards and sends them to Alice. Alice decrypts the cards with her private key and returns them to Bob or Carol, preserving security as none can read the cards initially."
  },
  {
    "slide_number": 112,
    "question": "How is fairness ensured in a three-player mental poker game involving Alice, Bob, and Carol?",
    "answer": "Fairness is ensured by allowing each player to decrypt their own cards with their private keys, revealing their hands. At the end of the game, all players reveal their hands and keys to verify no cheating occurred. Additional cards can be dealt using the same protocol, and if a player wants a card, they can request it from the deck holder."
  },
  {
    "slide_number": 113,
    "question": "What is secret sharing and how is it used to enforce collusion in access control?",
    "answer": "Secret sharing is a protocol that requires multiple parties to act together to access a secret, ensuring that no single individual can access it alone. For example, in a nuclear missile silo, two people must turn keys simultaneously to launch a missile. This concept can also apply to privacy in medical applications, where a patient and clinicians hold parts of the key needed to access medical records, requiring patient consent to use their part."
  },
  {
    "slide_number": 114,
    "question": "What is the concept of secret sharing with a threshold using La Grange Interpolating Polynomial, and how is it implemented?",
    "answer": "Secret sharing with a threshold involves dividing a secret key into 'n' parts, called shadows, and requires 'm' shadows to recover the secret, where m ≤ n. Adi Shamir's scheme uses a polynomial of degree m-1 for m shadows. A prime number 'p' larger than the number of shadows and the secret itself is chosen as public. The polynomial is (ax² + bx + M) mod p, with M as the secret. Coefficients 'a' and 'b' are randomly chosen, kept secret, and discarded after shadows"
  },
  {
    "slide_number": 115,
    "question": "How can you implement a (3,5) threshold scheme to create and reconstruct a shared secret using a polynomial, for example with M=11 and F(x) = (7x² + 8x + 11) mod 13?",
    "answer": "To implement the (3,5) threshold scheme, evaluate the polynomial F(x) at points x=1 to x=5:  \n- K1 = F(1) = 0  \n- K2 = F(2) = 3  \n- K3 = F(3) = 7  \n- K4 = F(4) = 12  \n- K5 = F(5) = 5  \n\nTo reconstruct"
  },
  {
    "slide_number": 116,
    "question": "How can a shared secret be reconstructed using cryptographic shadows, and what ensures its security?",
    "answer": "To reconstruct a shared secret, solve a system of equations using at least three shadows, such as K2, K3, and K5, with a polynomial equation modulo a prime (e.g., (a*x^2 + b*x + M) mod 13). The solution gives values for a, b, and M (e.g., a=7, b=8, M=11). The scheme can scale to more shadows (e.g., 30 shadows with 6 needed to recover the secret). Security is ensured by using random parameters, preventing fewer shadows from revealing the secret."
  },
  {
    "slide_number": 117,
    "question": "What is required to generate a patient's key for health measurement and decrypt medical records in a cryptographic system?",
    "answer": "To generate a patient's key and start health measurement, three shadows are needed: the patient's shadow, the principal clinician's shadow, and the central authority's shadow. To decrypt medical records, shadows from the patient, the principal clinician, and the referring clinician are required."
  },
  {
    "slide_number": 118,
    "question": "How can a standard [m,n] secret sharing scheme be modified to detect cheaters, and what role does a prime number play in this modification?",
    "answer": "To detect cheaters in a standard [m,n] secret sharing scheme, choose a prime number p larger than n and larger than (s-1)(m-1)/e + m, where s is the largest possible secret and e is the probability of successful cheating. Use random numbers between 1 and p-1 for shadow creation instead of sequential numbers. This increases the likelihood that a cheater's false shadow will be detected during secret recovery."
  },
  {
    "slide_number": 119,
    "question": "What are some key components in a security toolbox, and how are they used to solve security problems?",
    "answer": "The security toolbox includes symmetric encryption, message authentication codes, public-key encryption, one-way hash functions, digital signature schemes, and random number generators. These tools are combined into protocols to solve most security problems, though designing correct and resilient protocols is challenging. Advanced protocols like blind signatures, zero knowledge proofs of identity, and subliminal channels are also explored."
  },
  {
    "slide_number": 120,
    "question": "What are some classical and modern cryptography techniques covered in CPS571 Introduction to Cyber-Security?",
    "answer": "Classical techniques include the Cæsar cipher, Vigenere cipher, substitution, and transposition ciphers. Modern techniques include DES, AES, BlowFish, and a bit of the IDEA algorithm."
  },
  {
    "slide_number": 121,
    "question": "What is the core technology of cyberspace that enables security, and why is it important to understand its implications?",
    "answer": "Cryptography is the core technology of cyberspace, as it allows security to be integrated directly. Understanding its ramifications is crucial, even if not the mathematical details, because it underpins encryption, the oldest application of cryptography."
  },
  {
    "slide_number": 122,
    "question": "What are the five key ingredients of an encryption scheme?",
    "answer": "The five key ingredients of an encryption scheme are: 1) Plaintext (the original message), 2) Encryption algorithm (used to encode the plaintext), 3) Secret key(s) (known only to a few parties), 4) Ciphertext (the encoded message), and 5) Decryption algorithm (used to recover the plaintext)."
  },
  {
    "slide_number": 123,
    "question": "How can algorithms be classified in cryptography?",
    "answer": "Algorithms can be classified by the type of operations used for transforming plaintext to ciphertext, the number of keys used (symmetric with a single key or asymmetric with two keys), and the way in which the plaintext is processed."
  },
  {
    "slide_number": 124,
    "question": "Why is the secrecy of the key more important than the secrecy of the algorithm in security systems?",
    "answer": "Because algorithms cannot remain secret due to the need to distribute software and hardware, which can be disassembled. Open algorithms can be scrutinized for correctness, as seen in the case of the Clipper chip with the Skipjack algorithm (1993-1996)."
  },
  {
    "slide_number": 125,
    "question": "What is the average time required for an exhaustive key search for different key sizes, assuming a decryption rate of 10^6 decryptions per microsecond?",
    "answer": "- **32-bit key:** 2.15 milliseconds\n- **56-bit key:** 10 hours\n- **128-bit key:** 5.4 x 10^18 years\n- **168-bit key:** 5.9 x 10^30 years"
  },
  {
    "slide_number": 126,
    "question": "What are the main differences between symmetric key cryptography and public-key cryptography?",
    "answer": "In symmetric key cryptography, the sender and receiver use identical keys for both encryption and decryption. In public-key cryptography, the encryption key is public while the decryption key is secret (private)."
  },
  {
    "slide_number": 127,
    "question": "Who might Bob and Alice represent in real-life scenarios?",
    "answer": "Bob and Alice can represent parties involved in various electronic exchanges, such as email communication, web browser/server interactions for online purchases, online banking client/server transactions, DNS servers, routers exchanging routing table updates, and more."
  },
  {
    "slide_number": 128,
    "question": "What are the components of a cryptosystem and the primary goals of cryptography?",
    "answer": "A cryptosystem consists of a quintuple (E, D, M, K, C), where M is the set of plaintexts, K is the set of keys, C is the set of ciphertexts, E is the set of encryption functions (e: M x K -> C), and D is the set of decryption functions (d: C x K -> M). The primary goal of cryptography is to provide confidentiality, but it can also ensure data integrity, origin authentication, and non-repudiation."
  },
  {
    "slide_number": 129,
    "question": "What is the process of encrypting and decrypting using the Caesar Cipher with a key of 3?",
    "answer": "In the Caesar Cipher, each letter in the message is shifted by a fixed number of places down the alphabet. For encryption with key 3 (E3), each letter is shifted 3 places forward (e.g., A becomes D). For decryption with key 3 (D3), each letter is shifted 3 places backward (e.g., D becomes A). For example, \"HELLO WORLD\" encrypted with key 3 becomes \"KHOOR ZRUOG\"."
  },
  {
    "slide_number": 130,
    "question": "What are the types of cryptographic attacks, and how do they differ in terms of adversary capabilities?",
    "answer": "Cryptographic attacks can be categorized into three types in decreasing order of difficulty:  \n1. **Ciphertext-only attack:** The adversary has only the ciphertext and aims to find the plaintext and possibly the key.  \n2. **Known plaintext attack:** The adversary has both the ciphertext and the corresponding plaintext, with the goal of finding the key.  \n3. **Chosen plaintext attack:** The adversary can supply plaintexts and receive the corresponding ciphertexts, aiming to discover the key.  \nA useful plaintext example containing each letter is a pangram like \"a quick brown fox jumps"
  },
  {
    "slide_number": 131,
    "question": "What are the two primary types of attacks on cryptography, and how do they differ in approach?",
    "answer": "The two primary types of attacks on cryptography are mathematical and statistical attacks. Mathematical attacks focus on analyzing the underlying mathematics of cryptographic algorithms, which are public, while keeping the keys secret. Statistical attacks make assumptions about the distribution of elements like letters or letter combinations in plaintext, based on models of specific languages such as English, assuming that the ciphertext will exhibit similar statistical behavior."
  },
  {
    "slide_number": 132,
    "question": "What are the two basic types of symmetric ciphers in classical cryptography, and how do they function?",
    "answer": "The two basic types of symmetric ciphers are transposition ciphers, which rearrange characters in a message using a permutation function as the key, and substitution ciphers, which replace one character with another, like the Caesar cipher, using a mapping table as the key. Both can be attacked by analyzing letter occurrences, and combinations of them are called product ciphers. Modern algorithms perform these operations at the binary level in hardware."
  },
  {
    "slide_number": 133,
    "question": "What is a monoalphabetic substitution cipher, and how can it be broken?",
    "answer": "A monoalphabetic substitution cipher substitutes each letter in the plaintext with a different letter from the alphabet. It can be broken using brute force through permutations or by statistical analysis of letter frequencies."
  },
  {
    "slide_number": 134,
    "question": "What is the Vigenère cipher and how does it mitigate statistical attacks on substitution ciphers?",
    "answer": "The Vigenère cipher is a polyalphabetic cipher that uses a sequence of keys represented by a string to mitigate statistical attacks on substitution ciphers. It works by combining multiple Caesar ciphers, each key letter shifting the plaintext by a different amount. The key's length is called the period. If the key is short and repeats, the cipher is vulnerable to attack. A one-time pad is a variant where the key is used only once, with a length at least equal to the message."
  },
  {
    "slide_number": 135,
    "question": "What is the encryption approach described in Cp 571A for Fall 2024, derived from the Vigenère cipher?",
    "answer": "The approach involves using n substitution ciphers in a cycling pattern, where each new plaintext symbol is encrypted using the subsequent cipher in the pattern. For instance, with n=4, the pattern might be M1, M3, M4, M3, M2. The encryption key consists of both the substitution ciphers and the cyclic pattern. This method differs from stream ciphers, which encipher each letter independently, and block ciphers, which encipher larger parts of the message as streams of bits."
  },
  {
    "slide_number": 136,
    "question": "What is symmetric key cryptography and how do Bob and Alice agree on a key value?",
    "answer": "Symmetric key cryptography is a method where Bob and Alice share the same key, K, for both encryption and decryption. The challenge is agreeing on the key value, such as a known substitution pattern in a mono-alphabetic substitution cipher, securely."
  },
  {
    "slide_number": 137,
    "question": "What is the Data Encryption Standard (DES) and what are its key features?",
    "answer": "The Data Encryption Standard (DES) is a block cipher that encrypts 64-bit blocks using a 64-bit user key, outputting 64 bits of ciphertext. It is a product cipher, incorporating both transpositions and substitutions, and operates on bits as its basic unit. The cipher algorithm consists of 16 rounds, with the user's key reduced to 56 bits after dropping parity bits, and each round using a 48-bit key derived from the user's key. DES laid the groundwork for many other ciphers but is not widely used today."
  },
  {
    "slide_number": 138,
    "question": "How are the 16 round keys (K1 to K16) generated in the Fall 2024 Cp 571 encryption process?",
    "answer": "The initial key of 56 bits (from a 64-bit key with 8 parity bits removed) is permuted using PC-1. The registers Ci and Di each hold 28 bits, which are left-shifted as specified by the LSH table. These are concatenated, permuted using PC-2, and cut to 48 bits to produce each round key."
  },
  {
    "slide_number": 139,
    "question": "What is the process of encipherment in the DES algorithm as described in Fall 2024 Cp 571DES?",
    "answer": "In DES encipherment, there are 16 rounds each using a different key (Ki). In each round, the right half of the 64-bit input is expanded to 48 bits and XOR-ed with the round key. These 48 bits are divided into 8 sets of 6 bits, processed through S-boxes to produce 32 bits, which are permuted. This process involves initial and inverse initial permutations and utilizes both encryption and decryption steps with Li and Ri as 32-bit halves."
  },
  {
    "slide_number": 140,
    "question": "What is the purpose of the expansion function in the DES algorithm, and how does it transform the data?",
    "answer": "The expansion function in DES increases the size of the input from 32 bits to 48 bits by expanding Ri–1, allowing it to be XORed with the 48-bit subkey Ki. The output is then processed through S-boxes, which compress the data back to 32 bits."
  },
  {
    "slide_number": 141,
    "question": "What are the different modes of DES encryption covered in Fall 2024 Cp 571DES, and how do they differ?",
    "answer": "The modes of DES encryption include:  \n- **Electronic Code Book Mode (ECB):** Enciphers each block independently; considered weak.  \n- **Cipher Block Chaining Mode (CBC):** XORs each block with the previous ciphertext block, requiring an initialization vector for the first block.  \n- **Encrypt-Decrypt-Encrypt Mode (2 keys: k, k’):** Used in financial institutions, uses the formula c = DESk(DESk’–1(DESk(m))).  \n- **Encrypt-Encrypt-Encrypt Mode (3 keys: k"
  },
  {
    "slide_number": 142,
    "question": "What is the process of encryption in CBC mode using DES for multiple message blocks?",
    "answer": "In CBC mode, each message block is XORed with the previous ciphertext block before being encrypted with DES, starting with an initialization vector for the first block."
  },
  {
    "slide_number": 143,
    "question": "What led to the replacement of DES with AES, and what is the only approved implementation of DES today?",
    "answer": "DES was replaced by AES because its design was vulnerable to attacks, including those solved with distributed computing. NIST selected Rijndael as the AES in 2001. The original DES was officially withdrawn in 2005, and the only approved implementation of DES today is Triple DES."
  },
  {
    "slide_number": 144,
    "question": "What is the Advanced Encryption Standard (AES) and how does it differ from DES in terms of security and structure?",
    "answer": "AES is a symmetric-key encryption standard that replaces DES. It processes data in 128-bit blocks and can use key sizes of 128, 192, or 256 bits. AES involves at least 10 rounds of encryption, including various transformations like substitution, shifting, and mixing. Unlike DES, AES is much more secure, as brute force decryption that takes 1 second on DES would take 149 trillion years on AES."
  },
  {
    "slide_number": 145,
    "question": "What are the key features of the Advanced Encryption Standard (AES) block cipher?",
    "answer": "AES encrypts 128-bit blocks using keys of 128, 192, or 256 bits, producing 128-bit ciphertext. It is a product cipher using bit-level substitution and transposition. AES consists of multiple rounds: 10 rounds for a 128-bit key, 12 for a 192-bit key, and 14 for a 256-bit key, each using a round key derived from the original user-supplied key."
  },
  {
    "slide_number": 146,
    "question": "How does the AES encryption algorithm initially process the plaintext input?",
    "answer": "The plaintext input is placed into a state array, which is structured as a 4x4 byte matrix. This state array is then combined with the zero-th round key, which consists of 16 bytes (128 bits)."
  },
  {
    "slide_number": 147,
    "question": "**Q:** What are the first three steps in an AES encryption round?  \n**A:** 1. Combine the input with the initial round key using XOR (AddRoundKey).  \n2. Substitute new values for each byte of the state array using Rijndael S-box (SubBytes).  \n3. Cyclically shift the contents of each row by 0, 1, 2, or 3 byte positions (ShiftRows).",
    "answer": ""
  },
  {
    "slide_number": 148,
    "question": "What are the key steps involved in the AES encryption process during a round, and what is unique about the last round?",
    "answer": "In an AES encryption round, each column is independently altered using MixColumns through matrix multiplication with a known matrix, followed by XOR with the round key (AddRoundKey). In the last round, MixColumns is not performed, and the state array contains the encrypted input."
  },
  {
    "slide_number": 149,
    "question": "What are the steps of AES encryption after the initial round key addition?",
    "answer": "After the initial round key addition, AES encryption involves multiple rounds of four operations: SubBytes, ShiftRows, MixColumns, and AddRoundKey. (Note: The final round omits the MixColumns step.)"
  },
  {
    "slide_number": 150,
    "question": "What are the key steps involved in the AES decryption process?",
    "answer": "In AES decryption, the steps include reversing the round key schedule, placing the ciphertext into a state array, and then performing the following operations: InvShiftRows (cyclically shift rows in inverse), InvSubBytes (using inverse S-boxes), AddRoundKey (xor with reversed round key), and InvMixColumns (alter columns independently, not in the last round). After the last round, the state array yields the decrypted input."
  },
  {
    "slide_number": 151,
    "question": "What are some key improvements of AES over DES in terms of security and transparency?",
    "answer": "AES is designed to withstand vulnerabilities that affect DES, with all design decisions made public, particularly the S-boxes. AES ensures that after two rounds, every bit in the state array depends on every bit from two rounds ago, and it eliminates weak or semi-weak keys present in DES."
  },
  {
    "slide_number": 152,
    "question": "What are the key AES modes mentioned, and why is \"Triple-AES\" not used?",
    "answer": "AES modes include traditional DES modes and a new counter mode called CTR. \"Triple-AES\" isn't used because AES's extended block size makes it unnecessary."
  },
  {
    "slide_number": 153,
    "question": "What are some alternatives to DES and AES, and what are their characteristics?",
    "answer": "Alternatives to DES and AES include Blowfish and RC4. Blowfish, developed by B. Schneier in 1993, uses binary addition, XOR function, and 32-bit table lookup, requires 5KB of memory, and 521 rounds for subkey generation, making it unsuitable for frequent key changes. RC4 is a stream cipher operating on bytes, with keys input into a random number generator and outputs XOR-ed with each byte, allowing it to run quickly in software."
  },
  {
    "slide_number": 154,
    "question": "What are some key characteristics of the Blowfish encryption algorithm?",
    "answer": "Blowfish is a strong, unpatented, and license-free encryption algorithm available for all uses. It has no effective cryptanalysis to date but is less favored compared to larger block size ciphers like AES or Twofish. It was designed to be public domain and freely usable by anyone."
  },
  {
    "slide_number": 155,
    "question": "What are the key features and components of the Blowfish encryption algorithm?",
    "answer": "The Blowfish algorithm has a 64-bit block size and supports a key length from 32 to 448 bits (default 128 bits). It consists of two main parts: key expansion and data encryption. Key expansion involves pre-computing subkeys from the original key into a P-array with 18 subkeys and 4 S-boxes containing 256 entries each. Data encryption is performed in 16 rounds, using a 64-bit input (x) and the P-array (Pi for each iteration)."
  },
  {
    "slide_number": 156,
    "question": "What is the structure of Blowfish's encryption routine in terms of S-boxes and subkey arrays?",
    "answer": "Blowfish uses five subkey arrays: one 18-entry P-array and four 256-entry S-boxes (S0, S1, S2, S3). Each S-box is fed by an 8-bit input and produces a 32-bit output."
  },
  {
    "slide_number": 157,
    "question": "How does the Blowfish encryption algorithm process a data block through its rounds?",
    "answer": "In the Blowfish algorithm, the input block is divided into two halves, XL and XR. Each round (1 to 16) involves: XL = XL XOR Pi, XR = F(XL) XOR XR, followed by swapping XL and XR. After the final round, the last swap is undone, and the halves are recombined by XORing XR with P17 and XL with P18."
  },
  {
    "slide_number": 158,
    "question": "How does the Blowfish algorithm's F-function process input for encryption and decryption?",
    "answer": "The F-function splits a 32-bit input into four 8-bit quarters, uses them as input to S-boxes, then adds modulo 2^32 and XORs the outputs for a 32-bit result. Decryption reverses sub-key order, and since Blowfish is a Feistel network, it inverts by XORing P17 and P18 with the ciphertext and using P-entries in reverse."
  },
  {
    "slide_number": 159,
    "question": "What are the main steps involved in the key expansion process of the Blowfish algorithm?",
    "answer": "The key expansion process of the Blowfish algorithm includes: 1) Initializing the P-array and S-boxes with values derived from hexadecimal digits of pi; 2) XORing the P-array with key bits by cycling through the key; 3) Encrypting an all-zero string with Blowfish using the XORed subkeys; 4) Replacing P-array entries with the encryption output; 5) Modifying subkeys with real key bits; 6) Encrypting and replacing subsequent P-array entries; and 7) Repeating the process 521 times to update P-array and S-box"
  },
  {
    "slide_number": 160,
    "question": "How does the key schedule process work in the Blowfish encryption algorithm?",
    "answer": "Blowfish's key schedule initializes the P-array and S-boxes with values from π's hexadecimal digits. The secret key is XORed with P-entries, and a 64-bit zero block is encrypted. This ciphertext updates P-array entries iteratively, running the algorithm 521 times to generate all subkeys, processing about 4KB of data."
  },
  {
    "slide_number": 161,
    "question": "What is a Feistel network and which block ciphers commonly use this structure?",
    "answer": "A Feistel network is an asymmetric structure used in block cipher construction, named after cryptographer Horst Feistel. It is used in many block ciphers, including the US Data Encryption Standard (DES), Soviet/Russian GOST, Blowfish, and Twofish. In a Feistel cipher, both encryption and decryption involve iteratively running a \"round function\" a fixed number of times."
  },
  {
    "slide_number": 162,
    "question": "What are some products that utilize Blowfish encryption?",
    "answer": "Some products using Blowfish encryption include AEdit (a Windows word processor with text encryption), Coolfish (an encrypting text editor for Windows), Foopchat (encrypted chat and file sharing), JFile by Land-J Technologies (a PalmOS database program), and Freedom by Zero-Knowledge (privacy for web browsing, email, chat, telnet, and newsgroups)."
  },
  {
    "slide_number": 163,
    "question": "What is the International Data Encryption Algorithm (IDEA) and why was it developed?",
    "answer": "IDEA is a block cipher designed by Xuejia Lai and James L. Massey in 1991 as a minor revision of the Proposed Encryption Standard (PES), originally called IPES. It was developed to replace the DES algorithm, which had become vulnerable due to its small key size. IDEA was used in early versions of the Pretty Good Privacy cryptosystem."
  },
  {
    "slide_number": 164,
    "question": "What are the key characteristics and operations of the IDEA encryption algorithm?",
    "answer": "IDEA uses 64-bit blocks and a 128-bit key, combining XOR, addition modulo \\(2^{16}\\), and multiplication modulo \\(2^{16}+1\\) operations. It avoids permutations, S-boxes, and table lookups, with identical encryption and decryption processes using different key sub-blocks."
  },
  {
    "slide_number": 165,
    "question": "How does the IDEA encryption algorithm handle key generation and subkeys during its rounds?",
    "answer": "In IDEA, a 64-bit plaintext block is split into four 16-bit sub-blocks (X1, X2, X3, X4) and processed over 8 rounds. The algorithm uses 52 subkeys, with six subkeys per round and the last four subkeys used for output transformation. Subkeys are denoted as Zi(r), where 'r' is the round number and 'i' is the key index within the round."
  },
  {
    "slide_number": 166,
    "question": "How is a 128-bit key processed to generate subkeys for an 8-round encryption process?",
    "answer": "The 128-bit key is cyclically shifted left by 25 bits, then divided into eight 16-bit subkeys. For the first round, 6 subkeys are used, and 2 for the second round. This process repeats, generating 52 subkeys across 8 rounds."
  },
  {
    "slide_number": 167,
    "question": "What is the role of key sub-blocks in encryption and decryption?",
    "answer": "Key sub-blocks are used for encryption and decryption in individual rounds, as shown in Table 1."
  },
  {
    "slide_number": 168,
    "question": "How are 16-bit key sub-blocks and plaintext blocks combined in the encryption process described, and what happens at the end of the 8th encryption round?",
    "answer": "Initially, the first four 16-bit key sub-blocks are combined with two 16-bit plaintext blocks using addition modulo 2¹⁶, and with the other two using multiplication modulo 2¹⁶ + 1. Subkeys Z₅(r) and Z₆(r) further combine input bits. After each of the 8 encryption rounds, four 16-bit values are produced. At the end of the 8th round, these values are combined with the last four of the 52 key sub"
  },
  {
    "slide_number": 169,
    "question": "What is the main difference in the decryption process compared to encryption in terms of key sub-blocks?**",
    "answer": "During decryption, each of the 52 16-bit key sub-blocks is the inverse of those used during encryption, and they must be applied in reverse order."
  },
  {
    "slide_number": 170,
    "question": "What are the modes of operation supported by IDEA, and why is Electronic Code Book (ECB) mode not ideal for small block sizes?",
    "answer": "IDEA supports modes like Electronic Code Book (ECB), Cipher Block Chaining (CBC), Cipher Feedback (CFB), and Output Feedback (OFB). ECB mode partitions plaintext into blocks and encrypts each separately, but it is not ideal for small block sizes (e.g., less than 40 bits) due to potential security vulnerabilities."
  },
  {
    "slide_number": 171,
    "question": "Q: What are some applications of the IDEA algorithm in data encryption?  \nA: IDEA is used in security solutions across various sectors, including financial services, broadcasting, and government. It can protect data transmission and storage in areas such as cable TV, pay TV, video conferencing, distance learning, sensitive financial data, email over public networks, and smart cards.",
    "answer": ""
  },
  {
    "slide_number": 172,
    "question": "Why was IDEA chosen for data encryption in PGP, and what were its key development criteria?",
    "answer": "IDEA was chosen for data encryption in PGP due to its design for maximum security, meeting military strength requirements, and ease of hardware and software implementation."
  },
  {
    "slide_number": 173,
    "question": "Q: What is the course code for the Fall 2024 class?  \nA: Cp 571",
    "answer": ""
  },
  {
    "slide_number": 174,
    "question": "**Question:** What is a potential problem with symmetric ciphers, and how can keys be selected and distributed?",
    "answer": "**Answer:** A problem with symmetric ciphers is the need for secure key distribution, as the same key is used for both encryption and decryption. Keys can be selected by one party or a trusted third party. Distribution may involve physical delivery or electronic delivery using encrypted communication, requiring an existing key or keys."
  },
  {
    "slide_number": 175,
    "question": "**Question:** Why was the NSA able to decrypt the Soviet VENONA traffic, and what does it teach us about secure key management?",
    "answer": "**Answer:** The NSA decrypted the Soviet VENONA traffic because the Soviets reused one-time pads that should have been destroyed, violating secure key management principles. This teaches us the importance of exchanging, storing, and destroying keys securely to prevent unauthorized decryption."
  },
  {
    "slide_number": 176,
    "question": "What are the roles of permanent and session keys in secure communications?",
    "answer": "Permanent keys are used for important communications and to exchange session keys, which are temporary and created for each session. Session keys enhance security by ensuring eavesdroppers cannot easily exploit short-lived keys."
  },
  {
    "slide_number": 177,
    "question": "What is unicity distance in cryptography, and how does it relate to breaking a cipher?",
    "answer": "Unicity distance is the length of ciphertext needed to reduce the number of possible keys to zero in a brute force attack, leaving only one sensible plaintext. It depends on the plaintext's characteristics and the key length of the encryption algorithm, as introduced by Claude Shannon in the 1940s."
  },
  {
    "slide_number": 178,
    "question": "What is unicity distance in cryptanalysis, and how can it be increased?",
    "answer": "Unicity distance is the minimum amount of ciphertext needed to uniquely determine the encryption key. It can be increased by reducing redundancy, such as through data compression before encryption, which increases the effective information per character and thus requires more ciphertext for secure decryption."
  }
]

function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      onClick={() => setFlipped(state => !state)}
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
          opacity,
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
    if (!correct) {
      setMissedQuestions(prevMissed => [...prevMissed, cards[currentCardIndex]]);
    }
    setShowAnswer(false);
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
      <Flashcard flashcard={cards[currentCardIndex]} />
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
