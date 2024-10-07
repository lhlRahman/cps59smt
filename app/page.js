"use client";
import React, { useState, useEffect } from 'react';
import { useSpring, animated as a } from 'react-spring';
// Import the JSON data

const flashcardsData = [
  {
    "slide_number": 1,
    "type": "flashcard",
    "question": "Who is the instructor for CPS571 Introduction to Cyber-Security in Fall 2024?",
    "answer": "Dr. Jelena Mišić"
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "What is the name of the instructor for this course?",
    "answer": "Prof. Jelena Mišić, PhD"
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "Where is the instructor's office located?",
    "answer": "ENG -261, George Vari Engineering Building"
  },
  {
    "slide_number": 2,
    "type": "flashcard",
    "question": "When are the instructor's office hours?",
    "answer": "Thursday 3pm – 4pm, or by appointment (via email)"
  },
  {
    "slide_number": 3,
    "type": "flashcard",
    "question": "What are the key topics covered in this cybersecurity course?",
    "answer": "The course covers key cybersecurity concepts and practices, organizational security landscape, foundational security principles, organization risk management, adversarial thinking, data security, system security, internet security, cyber hygiene, and personal device protection."
  },
  {
    "slide_number": 3,
    "type": "flashcard",
    "question": "Which textbooks are suggested for the course, and are they mandatory?",
    "answer": "The suggested textbooks are 'Computer Security: Art and Science' by Matt Bishop, 'Secrets and Lies: Digital Security in a Networked World' by Bruce Schneier, and 'Applied Cryptography: Protocols, Algorithms and Source Code in C' by Bruce Schneier. None of them are mandatory."
  },
  {
    "slide_number": 4,
    "type": "flashcard",
    "question": "What are the main tenets of security in cybersecurity?",
    "answer": "Confidentiality, integrity, authentication, non-repudiation, and others."
  },
  {
    "slide_number": 4,
    "type": "flashcard",
    "question": "What is the role of security technology in cybersecurity?",
    "answer": "To understand its basic principles and limitations."
  },
  {
    "slide_number": 4,
    "type": "flashcard",
    "question": "Why is the human factor important in cybersecurity?",
    "answer": "Because it is the main contributor to cybersecurity challenges."
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "What percentage of the total grade does Midterm Test 1 account for?",
    "answer": "27%"
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "On what date is Midterm Test 2 scheduled?",
    "answer": "Thursday, November 19, 2024"
  },
  {
    "slide_number": 5,
    "type": "flashcard",
    "question": "How much does the final exam contribute to the overall grade?",
    "answer": "45%"
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "Why is computer security becoming increasingly important?",
    "answer": "As we become more connected through internet, mobile phones, smart TVs, and other smart devices, the importance of computer security increases to protect these connections."
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "What should you critically evaluate about vendors' security claims?",
    "answer": "You should question the truth and sense behind claims like 'this system is secure' or 'this product makes your network secure,' and assess if they hold true."
  },
  {
    "slide_number": 6,
    "type": "flashcard",
    "question": "What question should you ask when evaluating statements about online payment security?",
    "answer": "You should ask if the statement 'We secure online payments' is true and makes sense, and consider the actual security measures in place."
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "What is the main reason vendors cannot guarantee the security of a system?",
    "answer": "Vendors focus on the security of the product, not the overall system."
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "What important question should be asked regarding security?",
    "answer": "The important question is 'secure from what?' or 'secure from whom?'"
  },
  {
    "slide_number": 7,
    "type": "flashcard",
    "question": "Why might a security product not be faulty even if it fails to protect in certain scenarios?",
    "answer": "Because it was not designed to defend against those specific scenarios."
  },
  {
    "slide_number": 8,
    "type": "flashcard",
    "question": "What is the main problem mentioned in Slide 8?",
    "answer": "The main problem is making decisions about what the system is to be defended against and what threats to ignore without proper consideration."
  },
  {
    "slide_number": 8,
    "type": "flashcard",
    "question": "Why is it important to consider many factors in decision-making regarding system defense?",
    "answer": "Proper consideration is needed to ensure that the decisions made are effective and do not overlook critical threats."
  },
  {
    "slide_number": 8,
    "type": "flashcard",
    "question": "What is implied by the question 'system, you said?' in the context of the slide?",
    "answer": "It implies a need for clarity and understanding of what constitutes the 'system' that needs defending."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "What is a system, and how is it viewed differently in Eastern and Western philosophies?",
    "answer": "A system is a concept that views the world as a single entity with various components. Eastern philosophers have long seen the world as a single system, while Westerners traditionally segmented the world into separate interacting parts."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "How did engineering advancements change the concept of machines into systems?",
    "answer": "Engineering became sophisticated enough to create machines that function together as systems. A simple machine like a pulley became part of a complex system, like an elevator, which consists of multiple interacting machines."
  },
  {
    "slide_number": 9,
    "type": "flashcard",
    "question": "How do systems interact with each other in the context of machines and networks?",
    "answer": "Systems interact in ways such as an elevator interacting with a building’s electrical, fire control, and environmental control systems. Similarly, computers form networks, which interact to create larger networks."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "What are some key properties of systems?",
    "answer": "Systems have components, feedback loops, mean times between failure, infrastructure, interact with each other, have emergent properties, and contain bugs."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "Why was object-oriented programming developed?",
    "answer": "Object-oriented programming was developed to deal with the complexity of digital systems."
  },
  {
    "slide_number": 10,
    "type": "flashcard",
    "question": "How is a bug different from a malfunction?",
    "answer": "A bug is a particular kind of failure and an emergent property of a system, whereas a malfunction refers to machines breaking or failing to work properly."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "How do connectivity, complexity, and extendibility contribute to security issues?",
    "answer": "Connectivity, complexity, and extendibility can all contribute to security vulnerabilities because everything is interconnected, systems are increasingly complex, and interactions are not always transparent or secure."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "Why might an operating system with hundreds of millions of lines of code, like Windows, be considered insecure?",
    "answer": "An operating system with hundreds of millions of lines of code may be considered insecure because the complexity increases the potential for bugs and security vulnerabilities."
  },
  {
    "slide_number": 11,
    "type": "flashcard",
    "question": "What are the risks associated with the interaction of interconnected devices?",
    "answer": "The risks include not knowing who built the devices or how secure the connections are, which can lead to vulnerabilities and potential security breaches."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "Why is it challenging to secure complex systems like the Internet?",
    "answer": "Because they are inherently complex systems with design trade-offs, unseen variables, imperfect implementations, and faulty installations."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "What is the difference between theory and practice in security?",
    "answer": "In theory, systems can be designed to be secure, but in practice, real-world constraints and imperfections make it difficult to implement them securely."
  },
  {
    "slide_number": 12,
    "type": "flashcard",
    "question": "What are some areas of security theory mentioned in the slide?",
    "answer": "The theory of cryptography, the theory of firewalls and intrusion detection, and the theory of biometrics."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "Who is Dan Geer and what did he investigate?",
    "answer": "Dan Geer is a security expert who investigated the correlation between CERT vulnerability numbers, the number of hosts, and mega lines of code (MLOC)."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "How did Dan Geer define 'Opportunity' in his investigations?",
    "answer": "Dan Geer defined 'Opportunity' as the normalized product of the number of Internet hosts and the number of vulnerabilities."
  },
  {
    "slide_number": 13,
    "type": "flashcard",
    "question": "What did Dan Geer normalize in his analysis?",
    "answer": "Dan Geer normalized the lines-of-code growth over time against its own median over three years, as well as data about incidents."
  },
  {
    "slide_number": 14,
    "type": "flashcard",
    "question": "What is the significance of identifying opportunities for growth in a business context?",
    "answer": "Identifying opportunities for growth helps businesses expand their market presence, increase revenue, and achieve long-term sustainability by leveraging new markets, products, or strategies."
  },
  {
    "slide_number": 15,
    "type": "flashcard",
    "question": "What does MLOC stand for in the context of software metrics?",
    "answer": "MLOC stands for Million Lines of Code."
  },
  {
    "slide_number": 15,
    "type": "flashcard",
    "question": "Why is tracking incidents important in software development?",
    "answer": "Tracking incidents is important to identify and address software issues, improve system reliability, and enhance user satisfaction."
  },
  {
    "slide_number": 16,
    "type": "flashcard",
    "question": "What does MLOCs3 represent?",
    "answer": "MLOCs3 represents MLOC smoothed via a three-year moving average."
  },
  {
    "slide_number": 16,
    "type": "flashcard",
    "question": "How is MLOCs3^2+1 calculated?",
    "answer": "MLOCs3^2+1 is the square of the average, shifted one year to the right, and represents complexity proportional to the square of MLOC."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "What is the relationship between the number of vulnerabilities and the growth of the code base size?",
    "answer": "The number of vulnerabilities is very similar to the growth of the code base size."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "How is the number of incidents related to the complexity of the code base?",
    "answer": "The number of incidents is very similar to the complexity of the code base, shifted one year."
  },
  {
    "slide_number": 17,
    "type": "flashcard",
    "question": "Why is it unlikely that the similarity between code base size growth and vulnerabilities is a coincidence?",
    "answer": "Because someone has to understand the code base and identify possible vulnerabilities before launching an attack."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "What parallels exist between threats in the digital world and the physical world?",
    "answer": "Threats in the digital world mirror those in the physical world, such as embezzlement, robbery, and invasion of privacy."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "What are some examples of cyberspace crimes that reflect physical world crimes?",
    "answer": "Examples include theft, racketeering, vandalism, voyeurism, exploitation, extortion, con games, and fraud."
  },
  {
    "slide_number": 18,
    "type": "flashcard",
    "question": "How can threats in the digital world lead to physical harm?",
    "answer": "Cyberstalking and attacks against systems like air traffic control can lead to physical harm."
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "Do digital system attacks resemble their physical counterparts?",
    "answer": "Yes, digital system attacks often mimic those in the physical world."
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "Can past events help predict future trends in digital attacks?",
    "answer": "Yes, historical patterns can provide insights into future digital attack trends."
  },
  {
    "slide_number": 19,
    "type": "flashcard",
    "question": "Who are the main operators of the malware industry?",
    "answer": "The malware industry is operated by both criminals and governments."
  },
  {
    "slide_number": 20,
    "type": "flashcard",
    "question": "How does cyberspace change the nature of attacks compared to the physical world?",
    "answer": "In cyberspace, attacks are more common, more widespread, harder to track, capture, and convict perpetrators, and their effects are more devastating."
  },
  {
    "slide_number": 20,
    "type": "flashcard",
    "question": "What are the three new characteristics of the Internet that affect the nature of attacks?",
    "answer": "The slide content does not specify the three new characteristics of the Internet, only mentioning that they contribute to the changing nature of attacks."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "Why is automation considered an attacker's friend in the internet environment?",
    "answer": "Automation is an attacker's friend because computers are faster than humans, never get bored, and can find, link, or cross-reference large amounts of data from various sources."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "How does the internet's lack of boundaries benefit attackers?",
    "answer": "The internet's lack of boundaries allows attackers to operate from anywhere in the world, without needing to be close to the target system."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "What challenge does the international nature of the internet pose for legal action against attackers?",
    "answer": "The international nature of the internet complicates legal action against attackers, though significant progress has been made in addressing this issue."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "How do successful hacking techniques propagate in the internet environment?",
    "answer": "Successful hacking techniques can be automated and publicized, allowing even those without technical skills to use them."
  },
  {
    "slide_number": 21,
    "type": "flashcard",
    "question": "What is one of the problems posed by the availability of attack software kits?",
    "answer": "The availability of attack software kits means that criminals don't need advanced skills to conduct attacks, which poses a significant security challenge."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "What are the measures mentioned for running a secure computer system?",
    "answer": "Disconnect all dial-up connections, permit only direct-wired terminals, put the machine and its terminals in a shielded room, and post guards at the door."
  },
  {
    "slide_number": 22,
    "type": "flashcard",
    "question": "Why can't we work with the secure system measures mentioned in the Unix gospel anymore?",
    "answer": "Because we need to provide sufficiently good security and maintain it at all times through intertwined activities, which are not feasible with the mentioned measures."
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "What are the three key components of good security?",
    "answer": "Prevention, detection, and reaction."
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "Why is a prevention-only strategy insufficient in security?",
    "answer": "Because it only works if prevention mechanisms are perfect; otherwise, vulnerabilities can be exploited."
  },
  {
    "slide_number": 23,
    "type": "flashcard",
    "question": "What is a common human factor vulnerability in security?",
    "answer": "Social engineering, where attackers manipulate people into revealing passwords and other secrets."
  },
  {
    "slide_number": 24,
    "type": "flashcard",
    "question": "Who is the instructor for CPS571 Introduction to Cyber-Security in Fall 2024?",
    "answer": "Dr. Jelena Mišić"
  },
  {
    "slide_number": 25,
    "type": "flashcard",
    "question": "What is your task after reading about different types of attacks on this slide?",
    "answer": "Try to figure out if there is some kind of attack that does not fit into the categories listed."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "What are some types of criminal attacks that aim for financial gain?",
    "answer": "Fraud, ransomware, scams, theft of intellectual property, identity theft, and brand theft."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "What distinguishes destructive attacks from other types of criminal attacks?",
    "answer": "Destructive attacks lack a financial incentive and are often motivated by revenge or malice, unlike fraud or ransomware."
  },
  {
    "slide_number": 26,
    "type": "flashcard",
    "question": "What is ransomware?",
    "answer": "Ransomware is a type of attack where the perpetrator encrypts the victim's filesystem and demands a ransom to restore access."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "Can attackers be prosecuted under existing laws?",
    "answer": "Yes, laws against theft, counterfeiting, swindling, etc. apply to both digital and physical worlds."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "Are there new laws for digital attacks?",
    "answer": "Yes, new laws have been passed to address specific digital attacks."
  },
  {
    "slide_number": 27,
    "type": "flashcard",
    "question": "What is a challenge in prosecuting digital attackers?",
    "answer": "Finding the perpetrators is often difficult."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "What are some common targets of privacy violations?",
    "answer": "Credit records, healthcare data, and personal information for stalking, industrial espionage, or spying."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "Why does security have limitations in preventing privacy violations?",
    "answer": "Knowledgeable and well-funded attackers can eventually find out much data about you."
  },
  {
    "slide_number": 28,
    "type": "flashcard",
    "question": "What is data harvesting in the context of privacy violations?",
    "answer": "Data harvesting involves attackers automatically collecting credit card information and other data, often from online platforms like Amazon."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "Who was identified by tracking his cellular phone usage in 1993?",
    "answer": "Colombian drug lord Pablo Escobar."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "What technique was used to kill Chechnyan leader Dzhohar Dudayev in 1996?",
    "answer": "Pinpointing his location from the transmissions of his personal satellite phone."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "How did the FBI find the truck belonging to the Oklahoma City federal building's bomber?",
    "answer": "By collecting surveillance tapes from every camera in the city, correlating them by time using the explosion as a synch pulse, and identifying the truck."
  },
  {
    "slide_number": 29,
    "type": "flashcard",
    "question": "What modern technology is mentioned as being able to listen to conversations and identify keywords?",
    "answer": "Powerful AI."
  },
  {
    "slide_number": 30,
    "type": "flashcard",
    "question": "What is a common reason given for recording customer service conversations?",
    "answer": "This conversation may be monitored or recorded for quality assurance purposes."
  },
  {
    "slide_number": 30,
    "type": "flashcard",
    "question": "How do online merchants use your browsing and purchase history?",
    "answer": "Online merchants track what you buy or look at to offer you similar items in the future."
  },
  {
    "slide_number": 30,
    "type": "flashcard",
    "question": "What common feature do Google Maps, Apple Maps, and Waze share concerning data use?",
    "answer": "They monitor cellular traffic to help navigate the streets."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "What can be inferred from analyzing Bitcoin transaction graphs as discussed in the paper by Fleder, Kester, and Pillai?",
    "answer": "A lot of information can be figured out from public transaction data, even though the identities of participants are protected."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "In the example of address A sending money to other addresses, what could it imply when many transactions eventually lead to a single address X?",
    "answer": "It might imply that address X is the final recipient or an aggregator of funds from multiple sources, possibly indicating a consolidation of assets."
  },
  {
    "slide_number": 31,
    "type": "flashcard",
    "question": "Can the NSA determine the IP addresses from which Bitcoin transactions were initiated?",
    "answer": "Yes, the NSA can find the IP addresses from which the transactions were launched."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "What might a pattern of communication, where Alice sends a long message to Bob and Bob replies with a short message to Alice and long messages to five others, indicate?",
    "answer": "It indicates a chain of command where Alice is sending orders to Bob, who relays them to his subordinates."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "What unusual activity was observed prior to the U.S. bombing of Iraq in 1991?",
    "answer": "Pizza deliveries to the Pentagon increased one hundredfold."
  },
  {
    "slide_number": 32,
    "type": "flashcard",
    "question": "Did pizza deliveries to the CIA headquarters change in the hours preceding the U.S. bombing of Iraq in 1991?",
    "answer": "No, pizza deliveries to the CIA headquarters did not change."
  },
  {
    "slide_number": 33,
    "type": "flashcard",
    "question": "What is a common reason denial-of-service attacks are effective?",
    "answer": "Denial-of-service attacks are effective because computer networks are designed to communicate, and a simple automated attack can overwhelm them."
  },
  {
    "slide_number": 33,
    "type": "flashcard",
    "question": "Why might low-tech approaches be favored in denial-of-service attacks?",
    "answer": "Low-tech approaches are often better than high-tech in denial-of-service attacks because they can be simpler and more efficient in overwhelming a network."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "What was the response of the British bank when a man complained about unauthorized withdrawals in 1994?",
    "answer": "The bank claimed that the ATM system's security was infallible and charged the man with attempted fraud."
  },
  {
    "slide_number": 34,
    "type": "flashcard",
    "question": "Why are legal system attacks challenging to protect against?",
    "answer": "Because the goal is to persuade parties, such as the judge and jury, that there could be a flaw in the system, making it untrustworthy."
  },
  {
    "slide_number": 35,
    "type": "flashcard",
    "question": "What is the term used to describe opponents or enemies in a competitive or conflict scenario?",
    "answer": "Adversaries"
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "What factors are used to categorize digital world adversaries?",
    "answer": "Adversaries are categorized according to their objectives, access, resources, expertise, and risk."
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "What are some common objectives of digital world adversaries?",
    "answer": "Common objectives include causing damage, financial gain, and accessing confidential information."
  },
  {
    "slide_number": 36,
    "type": "flashcard",
    "question": "Why might countermeasures that stop individual hackers not work against organized crime?",
    "answer": "Organized crime is more dangerous and may possess greater resources and expertise, requiring different countermeasures than those for individual hackers."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "Why can an insider cause more damage than an outsider?",
    "answer": "An insider can do much more damage due to their access to the organization's resources and information."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "How does the resource level of an adversary affect their potential danger?",
    "answer": "An adversary with more resources, primarily money, is much more dangerous because they can buy other necessary resources."
  },
  {
    "slide_number": 37,
    "type": "flashcard",
    "question": "What factor varies among different kinds of adversaries and affects their behavior?",
    "answer": "Risk tolerance varies among different kinds of adversaries and affects their behavior."
  },
  {
    "slide_number": 38,
    "type": "flashcard",
    "question": "What factors influence a rational adversary's choice of attack?",
    "answer": "A rational adversary will choose an attack based on the best return on investment, considering their level of access, expertise, and affordability of the attack."
  },
  {
    "slide_number": 39,
    "type": "flashcard",
    "question": "What is a possible definition of a hacker?",
    "answer": "An individual who experiments with the limitations of systems for intellectual curiosity or pleasure; a person with a particular set of skills and not necessarily a particular set of morals."
  },
  {
    "slide_number": 39,
    "type": "flashcard",
    "question": "What are the stereotypical characteristics of today's computer hackers?",
    "answer": "They are typically young (twenty-something and younger), male, and socially on the fringe."
  },
  {
    "slide_number": 39,
    "type": "flashcard",
    "question": "How does a hacker's expertise compare to system designers?",
    "answer": "Hackers can have expertise on a par with, or even greater than, the system’s original designers."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "What is the ethical dilemma presented in the example of finding a note on a refrigerator?",
    "answer": "The dilemma is whether it is acceptable for someone to break into a home to point out a security flaw without causing any harm."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "What is a problem associated with hackers creating tools for hacking?",
    "answer": "The problem is that many people can download and use these tools without understanding how they work, which can lead to unethical or illegal activities."
  },
  {
    "slide_number": 40,
    "type": "flashcard",
    "question": "Which types of organizations might specifically look to hire hackers?",
    "answer": "Security agencies and some other organizations may look specifically for hackers to enhance their security measures."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "What type of criminals cause the bulk of computer-related crimes?",
    "answer": "Lone criminals cause the bulk of computer-related crimes."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "Why do lone criminals typically target commerce systems?",
    "answer": "Lone criminals typically target commerce systems because that's where the money is."
  },
  {
    "slide_number": 41,
    "type": "flashcard",
    "question": "What are common characteristics of lone criminals in computer-related crimes?",
    "answer": "Lone criminals usually don't have much money, access, or expertise, and often get caught due to stupid mistakes."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "Who are considered potential malicious insiders?",
    "answer": "Employees, consultants, and contractors."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "Why are malicious insiders particularly dangerous?",
    "answer": "They have a high level of access and perimeter defenses don't work against them."
  },
  {
    "slide_number": 42,
    "type": "flashcard",
    "question": "What are some motivations for malicious insiders?",
    "answer": "Revenge, financial gain, institutional change, or publicity."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What is the primary motivation behind industrial espionage?",
    "answer": "To gain an advantage over the competition by stealing competitors’ trade secrets."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What distinguishes competitive intelligence from industrial espionage?",
    "answer": "The legality of investigative techniques; competitive intelligence is legal, while industrial espionage involves illegal activities."
  },
  {
    "slide_number": 43,
    "type": "flashcard",
    "question": "What factors contribute to the practice of industrial espionage?",
    "answer": "Industrial espionage is well-funded and relies on personal knowledge, as amoral but rational companies devote enough resources to achieve an acceptable return on investment."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "What are the core competencies of organized crime?",
    "answer": "Drugs, prostitution, extortion, fraud, gambling, money laundering."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "How is technology used in organized crime?",
    "answer": "Technology is used both as a new venue for crime and as support for its core businesses."
  },
  {
    "slide_number": 44,
    "type": "flashcard",
    "question": "What example is given of law enforcement breaking through organized crime's technological barriers?",
    "answer": "The DEA breaking the solid encryption of Sky mobile phones."
  },
  {
    "slide_number": 45,
    "type": "flashcard",
    "question": "What are security needs?",
    "answer": "Security needs refer to the requirements necessary to protect individuals, organizations, and systems from harm, threats, or unauthorized access."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "What is often the first thing that comes to mind when discussing security?",
    "answer": "Privacy"
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "Do most people and businesses in the United States pay for privacy?",
    "answer": "No, most people and businesses are not willing to pay for privacy, unlike governments."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "Who owns the data about individuals in the United States?",
    "answer": "In the United States, individuals don’t own the data about themselves."
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "What regulation covers data protection in the European Union?",
    "answer": "General Data Protection Regulation (GDPR)"
  },
  {
    "slide_number": 46,
    "type": "flashcard",
    "question": "What had to occur to establish that individuals own their healthcare data in the United States?",
    "answer": "A lawsuit had to occur to decide that an individual owns their own healthcare data, with a few exceptions."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "Why is long-term privacy often not needed for businesses and governments?",
    "answer": "Because business and government privacy needs are typically short-term, ranging from weeks to years, with some exceptions like the Coca-Cola recipe."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "What makes it difficult for governments to maintain privacy?",
    "answer": "Keeping secrets is harder due to the involvement of many people."
  },
  {
    "slide_number": 47,
    "type": "flashcard",
    "question": "What did Schneier predict about future elections in relation to privacy?",
    "answer": "Schneier predicted that in about two decades, election candidates would need to explain emails they wrote as adolescents."
  },
  {
    "slide_number": 48,
    "type": "flashcard",
    "question": "How long must U.S. census raw data remain secret?",
    "answer": "72 years"
  },
  {
    "slide_number": 48,
    "type": "flashcard",
    "question": "Until when does the CIA mandate that the identities of spies remain secret?",
    "answer": "Until the spy is dead and all the spy’s children are dead."
  },
  {
    "slide_number": 48,
    "type": "flashcard",
    "question": "How long does Canadian census data remain secret?",
    "answer": "Forever"
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "What is the relationship between confidentiality and privacy?",
    "answer": "Confidentiality is similar to privacy but most often involves two parties, focusing on the privacy of communications."
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "How is confidentiality typically accomplished?",
    "answer": "Confidentiality is typically accomplished through encryption."
  },
  {
    "slide_number": 49,
    "type": "flashcard",
    "question": "What is a potential vulnerability of encryption methods?",
    "answer": "Many encryption methods can be broken."
  },
  {
    "slide_number": 50,
    "type": "flashcard",
    "question": "What is multilevel security, and why is it important in certain applications?",
    "answer": "Multilevel security is a system that restricts access to information based on different secrecy levels (such as public, secret, and top secret). It is important in applications like commercial, governmental, and military to ensure that not all people have access to all information."
  },
  {
    "slide_number": 50,
    "type": "flashcard",
    "question": "How is authorization determined in a multilevel security system?",
    "answer": "Authorization in a multilevel security system is typically determined on a role-based basis, although it can also be case-by-case."
  },
  {
    "slide_number": 50,
    "type": "flashcard",
    "question": "What does the 'need to know' category refer to in the context of multilevel security?",
    "answer": "The 'need to know' category further restricts access to information, ensuring that a person or role can only see what is necessary for their role."
  },
  {
    "slide_number": 51,
    "type": "flashcard",
    "question": "What are some benefits of social anonymity?",
    "answer": "Social anonymity can be beneficial for the health of the world, such as providing protection and privacy for rape survivors."
  },
  {
    "slide_number": 51,
    "type": "flashcard",
    "question": "Why is political anonymity considered important?",
    "answer": "Political anonymity is important as it allows individuals to express political opinions and engage in political activities without fear of retribution or persecution."
  },
  {
    "slide_number": 51,
    "type": "flashcard",
    "question": "What is a common issue associated with anonymity provided by the Internet?",
    "answer": "Anonymity provided by the Internet is often abused, leading to negative consequences such as cyberbullying and dissemination of false information."
  },
  {
    "slide_number": 52,
    "type": "flashcard",
    "question": "What is complete anonymity?",
    "answer": "Complete anonymity refers to situations where there is no identifying information, such as a letter without a return address or a blocked phone number."
  },
  {
    "slide_number": 52,
    "type": "flashcard",
    "question": "What is pseudonymity?",
    "answer": "Pseudonymity is when you use a fictitious name to conceal your identity, such as introducing yourself as 'Bob' at an AA meeting."
  },
  {
    "slide_number": 52,
    "type": "flashcard",
    "question": "Why is achieving anonymity challenging in cyberspace?",
    "answer": "Achieving anonymity in cyberspace is challenging because devices like CPUs, printers, and Office applications have serial numbers that can be traced."
  },
  {
    "slide_number": 53,
    "type": "flashcard",
    "question": "What does Bitcoin provide in terms of financial transactions?",
    "answer": "Bitcoin provides anonymous financial transactions."
  },
  {
    "slide_number": 53,
    "type": "flashcard",
    "question": "Why might anonymity be sacrificed in commercial transactions?",
    "answer": "Anonymity is often sacrificed for some gain, such as earning frequent flyer miles."
  },
  {
    "slide_number": 53,
    "type": "flashcard",
    "question": "Are all offers that sacrifice anonymity widely accepted?",
    "answer": "No, not all such offers are widely accepted."
  },
  {
    "slide_number": 54,
    "type": "flashcard",
    "question": "Why is medical data sharing important?",
    "answer": "Medical data sharing is important because it allows for continuity of care without the need for repetitive tests, such as blood samples, during each doctor visit."
  },
  {
    "slide_number": 54,
    "type": "flashcard",
    "question": "What is a concern associated with sharing medical data?",
    "answer": "A concern is that medical data is very personal, and there is a need to limit access to it, typically to healthcare providers and possibly insurance companies."
  },
  {
    "slide_number": 54,
    "type": "flashcard",
    "question": "What does HIPAA stand for and what is its role in medical data?",
    "answer": "HIPAA stands for the Health Insurance Portability and Accountability Act, and it sets standards for computerized medical records to protect patient privacy."
  },
  {
    "slide_number": 54,
    "type": "flashcard",
    "question": "What legal principle regarding medical data ownership has been established?",
    "answer": "Lawsuits have established the principle that patients own their medical data."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "What is the main purpose of authentication?",
    "answer": "The main purpose of authentication is to prove that you or the other party is who they claim to be, which is essential for knowing who to trust."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "Why is authentication important in everyday activities, such as buying ice cream from a truck?",
    "answer": "Authentication is important in everyday activities to ensure trust and verify identities, preventing fraud or deceit in transactions."
  },
  {
    "slide_number": 55,
    "type": "flashcard",
    "question": "How does the internet complicate authentication?",
    "answer": "The internet complicates authentication by making it difficult to verify the true identity of online entities, as exemplified by the ambiguity between similar URLs like www.nwa.com and www.northwest-airlines.com."
  },
  {
    "slide_number": 56,
    "type": "flashcard",
    "question": "What is session authentication?",
    "answer": "Session authentication authenticates the continuity of a particular conversation. It is easier to do face-to-face or on the phone, but not quite easy on the Internet."
  },
  {
    "slide_number": 56,
    "type": "flashcard",
    "question": "What is transaction authentication?",
    "answer": "Transaction authentication determines whether a transaction is valid, including all parties involved."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "What is a key concern regarding the integrity of digital data?",
    "answer": "The concern is whether the data is truly from the source and has not been tampered with."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "How does integrity differ from authentication in the context of data?",
    "answer": "While both deal with the authenticity of data, integrity focuses on whether data has been altered, whereas authentication verifies the identity of the source."
  },
  {
    "slide_number": 57,
    "type": "flashcard",
    "question": "Why is tampering with digital data considered easy?",
    "answer": "Tampering with digital data is considered easy because it can be easily altered and propagated over the Internet."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "What is the role of double-entry bookkeeping in auditing?",
    "answer": "Double-entry bookkeeping serves as a form of audit by allowing early detection of mistakes and reducing the likelihood of fraud."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "Can auditing prevent attacks?",
    "answer": "No, auditing cannot prevent attacks but it can detect successful attacks, figure out what happened, and prove it later, such as in court."
  },
  {
    "slide_number": 58,
    "type": "flashcard",
    "question": "What determines the amount of auditing needed?",
    "answer": "The amount of auditing needed depends on the specific application."
  },
  {
    "slide_number": 59,
    "type": "flashcard",
    "question": "What is the cycle described in the slide regarding systems and criminals?",
    "answer": "A system is devised, criminals find ways to abuse it, the system is improved, and then criminals adapt again."
  },
  {
    "slide_number": 59,
    "type": "flashcard",
    "question": "How was credit card verification originally performed?",
    "answer": "Credit card verification was originally done offline."
  },
  {
    "slide_number": 59,
    "type": "flashcard",
    "question": "What role do AI programs play in combating credit card fraud?",
    "answer": "AI programs check spending patterns and alert users to irregularities."
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "What are some examples of classical cryptographic techniques?",
    "answer": "Cæsar cipher, Vigenere cipher, substitution, and transposition ciphers."
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "Name some modern cryptographic algorithms mentioned in the slide.",
    "answer": "DES, AES, BlowFish, and a bit of IDEA algorithm."
  },
  {
    "slide_number": 60,
    "type": "flashcard",
    "question": "Who is the author of the book 'Computer Security: The Art and Science' mentioned in the slide?",
    "answer": "M. Bishop."
  },
  {
    "slide_number": 61,
    "type": "flashcard",
    "question": "What is the core technology of cyberspace that allows for built-in security?",
    "answer": "Cryptography"
  },
  {
    "slide_number": 61,
    "type": "flashcard",
    "question": "Why is it important to understand cryptography?",
    "answer": "Understanding cryptography helps in knowing its ramifications and effectively applying it in cyberspace."
  },
  {
    "slide_number": 61,
    "type": "flashcard",
    "question": "What is the oldest application of cryptography?",
    "answer": "Encryption"
  },
  {
    "slide_number": 62,
    "type": "flashcard",
    "question": "What are the five ingredients of an encryption scheme?",
    "answer": "The five ingredients are plaintext, encryption algorithm, secret key, ciphertext, and decryption algorithm."
  },
  {
    "slide_number": 62,
    "type": "flashcard",
    "question": "What is the role of the encryption algorithm in an encryption scheme?",
    "answer": "The encryption algorithm is used to encode the plaintext."
  },
  {
    "slide_number": 62,
    "type": "flashcard",
    "question": "What is ciphertext?",
    "answer": "Ciphertext is the encoded message resulting from the encryption process."
  },
  {
    "slide_number": 63,
    "type": "flashcard",
    "question": "What are the three main ways algorithms can be classified in cryptography?",
    "answer": "Algorithms can be classified based on the type of operations used for transforming plaintext to ciphertext and back, the number of keys used (symmetric or asymmetric), and the way in which the plaintext is processed."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "Why is security primarily dependent on the secrecy of the key rather than the algorithm?",
    "answer": "Because an algorithm cannot be kept secret as it must be distributed and can be disassembled, whereas a key can remain secret."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "What is the advantage of open algorithms in terms of security?",
    "answer": "Open algorithms can be scrutinized for correctness, allowing for potential vulnerabilities to be identified and addressed."
  },
  {
    "slide_number": 64,
    "type": "flashcard",
    "question": "What is an example of a case where the algorithm was not kept secret?",
    "answer": "The Clipper chip with the Skipjack algorithm, used between 1993 and 1996, is an example where the algorithm was not kept secret."
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "What is the average time required for an exhaustive key search for a 32-bit key at a rate of 10^6 decryptions per microsecond?",
    "answer": "2.15 milliseconds"
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "How long does it take on average to exhaustively search a 56-bit key space at 10^6 decryptions per microsecond?",
    "answer": "10 hours"
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "What is the estimated time to exhaustively search a 128-bit key space at 10^6 decryptions per microsecond?",
    "answer": "5.4 x 10^18 years"
  },
  {
    "slide_number": 65,
    "type": "flashcard",
    "question": "Calculate the time required to exhaustively search a 168-bit key space at a rate of 10^6 decryptions per microsecond.",
    "answer": "9.5 x 10^30 years"
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "What is the main characteristic of symmetric key cryptography?",
    "answer": "In symmetric key cryptography, the sender and receiver keys are identical."
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "How does public-key cryptography differ from symmetric key cryptography?",
    "answer": "In public-key cryptography, the encryption key is public, while the decryption key is secret (private)."
  },
  {
    "slide_number": 66,
    "type": "flashcard",
    "question": "What type of attack might Trudy, the intruder, attempt while listening to the traffic?",
    "answer": "Trudy might attempt a man-in-the-middle attack."
  },
  {
    "slide_number": 67,
    "type": "flashcard",
    "question": "Who might Bob and Alice represent in real-life scenarios?",
    "answer": "Real-life Bobs and Alices could be parties exchanging emails or messages, web browsers/servers for electronic transactions, online banking client/servers, DNS servers, routers exchanging routing table updates, among other examples."
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "What does the quintuple (E, D, M, K, C) represent in a cryptosystem?",
    "answer": "E is the set of encryption functions, D is the set of decryption functions, M is the set of plaintexts, K is the set of keys, and C is the set of ciphertexts."
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "What is the primary purpose of cryptography?",
    "answer": "Cryptography mainly provides confidentiality."
  },
  {
    "slide_number": 68,
    "type": "flashcard",
    "question": "Aside from confidentiality, what other security aspects can cryptography provide?",
    "answer": "Cryptography can provide integrity of data, origin verification, and non-repudiation."
  },
  {
    "slide_number": 69,
    "type": "flashcard",
    "question": "What is the mathematical function used for encryption in a Caesar Cipher?",
    "answer": "Ek(m) = (m + k) mod 26"
  },
  {
    "slide_number": 69,
    "type": "flashcard",
    "question": "What is the decryption function in a Caesar Cipher?",
    "answer": "Dk(c) = (26 + c - k) mod 26"
  },
  {
    "slide_number": 69,
    "type": "calculation",
    "question": "Encrypt the word 'HELLO' using a Caesar Cipher with a key of 3.",
    "answer": "KHOOR"
  },
  {
    "slide_number": 69,
    "type": "flashcard",
    "question": "What is the range for key 'k' in a Caesar Cipher?",
    "answer": "0 ≤ k ≤ 25"
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "What is the term used for an opponent whose goal is to break a cryptosystem?",
    "answer": "The adversary."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "What does the adversary know and not know in a cryptographic attack?",
    "answer": "The adversary knows the algorithm used (public) but not the key."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "List the three types of cryptographic attacks in decreasing order of difficulty.",
    "answer": "Ciphertext only, known plaintext, chosen plaintext."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "What is the goal of a ciphertext-only attack in cryptography?",
    "answer": "To find the plaintext and possibly the key."
  },
  {
    "slide_number": 70,
    "type": "flashcard",
    "question": "Define a pangram and give an example.",
    "answer": "A pangram is a sentence that contains every letter of the alphabet. Example: 'a quick brown fox jumps over the lazy dog.'"
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "What do real attacks typically target instead of breaking cryptography?",
    "answer": "Real attacks generally don't break cryptography; they target other vulnerabilities, such as tunneling into the vault instead of picking the lock."
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "What are mathematical attacks based on in the context of cryptography?",
    "answer": "Mathematical attacks are based on the analysis of the underlying mathematics of crypto algorithms, which are public, while keys are kept secret."
  },
  {
    "slide_number": 71,
    "type": "flashcard",
    "question": "What assumptions do statistical attacks make in cryptography?",
    "answer": "Statistical attacks make assumptions about the distribution of letters, digrams, and trigrams in plaintext, using a model of a particular language like English."
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "What is a key characteristic of symmetric cryptography?",
    "answer": "In symmetric cryptography, the sender and receiver share a common key for both encryption and decryption."
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "What are the two basic types of symmetric ciphers?",
    "answer": "The two basic types of symmetric ciphers are transposition ciphers and substitution ciphers."
  },
  {
    "slide_number": 72,
    "type": "flashcard",
    "question": "How can symmetric ciphers be attacked?",
    "answer": "Symmetric ciphers can be attacked by statistical methods, such as analyzing 1-gram and 2-gram occurrences of letters in the message."
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "What is a substitution cipher in symmetric key cryptography?",
    "answer": "A substitution cipher involves substituting one thing for another, such as substituting one letter for another in a monoalphabetic cipher."
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "How is a monoalphabetic cipher implemented at the hardware level?",
    "answer": "At the hardware level, sequences of bits are substituted in a monoalphabetic cipher."
  },
  {
    "slide_number": 73,
    "type": "flashcard",
    "question": "What is the encryption key in a monoalphabetic substitution cipher?",
    "answer": "The encryption key is a mapping from a set of 26 letters to another set of 26 letters."
  },
  {
    "slide_number": 74,
    "type": "flashcard",
    "question": "What is the main purpose of the Vigenere cipher in cryptography?",
    "answer": "The main purpose of the Vigenere cipher is to mitigate statistical attacks on substitution ciphers by using a sequence of keys represented by a string, making it a poly-alphabetic cipher."
  },
  {
    "slide_number": 74,
    "type": "flashcard",
    "question": "What is the 'period' in the context of the Vigenere cipher?",
    "answer": "The 'period' in the context of the Vigenere cipher is the length of the key."
  },
  {
    "slide_number": 74,
    "type": "flashcard",
    "question": "How does the Vigenere cipher differ from the one-time pad?",
    "answer": "The Vigenere cipher uses a repeating key, while the one-time pad is a variant of the Vigenere cipher where the key is chosen at random, used only once, and has at least the length of the message."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "What is the key component of the encryption approach mentioned in the slide that comes from the Vigenere cipher?",
    "answer": "The key component is the use of multiple substitution ciphers (n substitution ciphers) and a cyclic pattern for encrypting each new plaintext symbol."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "How does the cyclic pattern work in the encryption approach described?",
    "answer": "For each new plaintext symbol, a subsequent substitution cipher from the cyclic pattern is used. For example, if n=4: the pattern might be M1,M3,M4,M3,M2, and it repeats."
  },
  {
    "slide_number": 75,
    "type": "flashcard",
    "question": "What is the difference between stream ciphers and block ciphers as mentioned in the slide?",
    "answer": "Stream ciphers encipher each letter independently, whereas block ciphers encipher whole messages or large parts of them as streams of bits."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "What is symmetric key cryptography?",
    "answer": "Symmetric key cryptography is a method where Bob and Alice share the same key (symmetric key) for encryption and decryption."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "In symmetric key cryptography, what is an example of a key?",
    "answer": "An example of a key in symmetric key cryptography is a known substitution pattern in a mono-alphabetic substitution cipher."
  },
  {
    "slide_number": 76,
    "type": "flashcard",
    "question": "What is a key challenge in symmetric key cryptography?",
    "answer": "A key challenge in symmetric key cryptography is how Bob and Alice agree on the key value."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "What is the block size used by the Data Encryption Standard (DES)?",
    "answer": "DES encrypts blocks of 64 bits."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "How many rounds does the DES algorithm perform?",
    "answer": "The DES algorithm consists of 16 rounds (iterations)."
  },
  {
    "slide_number": 77,
    "type": "flashcard",
    "question": "What is the key size used in DES after dropping the parity bits?",
    "answer": "The user's key is reduced to 56 bits after dropping the parity bits."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "What is the bit length of the initial key used in generating the 16 round keys for Cp 571?",
    "answer": "56 bits (64 bits minus 8 bits for parity)."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "How are the round keys generated from the initial key in Cp 571?",
    "answer": "Round keys are obtained by permuting the 56 bits of the initial key and extracting 48 bits each time."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "What roles do PC-1 and PC-2 play in the key generation process?",
    "answer": "PC-1 and PC-2 are permutation tables used to rearrange the bits during the key generation process."
  },
  {
    "slide_number": 78,
    "type": "flashcard",
    "question": "What is the purpose of the LSH table in the key generation process?",
    "answer": "The LSH table specifies one or two-bit left shifts depending on the round during the key generation."
  },
  {
    "slide_number": 79,
    "type": "flashcard",
    "question": "How many rounds of encipherment are there in the Fall 2024 Cp 571DES encipherment process?",
    "answer": "There are 16 rounds of encipherment."
  },
  {
    "slide_number": 79,
    "type": "flashcard",
    "question": "What happens to the right half of the input in the encipherment process?",
    "answer": "The right half of the input is expanded to 48 bits and XOR-ed with the round key."
  },
  {
    "slide_number": 79,
    "type": "flashcard",
    "question": "What is the function of the S-box in the encipherment process?",
    "answer": "Each S-box takes a 6-bit input and produces a 4-bit output, which are concatenated into a 32-bit entity."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "What is the function of the 'E' operation in the DES algorithm?",
    "answer": "The 'E' operation in the DES algorithm is the Expansion function, which expands 32 bits to 48 bits."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "How many bits does each S-box in DES output after processing?",
    "answer": "Each S-box in DES outputs 4 bits after processing."
  },
  {
    "slide_number": 80,
    "type": "flashcard",
    "question": "What is the size of the input and output for the DES 'P' permutation?",
    "answer": "The DES 'P' permutation takes 32 bits as input and outputs 32 bits."
  },
  {
    "slide_number": 81,
    "type": "flashcard",
    "question": "What is the direct use of DES known as?",
    "answer": "Electronic Code Book Mode (ECB)"
  },
  {
    "slide_number": 81,
    "type": "flashcard",
    "question": "Why is the ECB mode rarely used?",
    "answer": "Because it was considered weak since it enciphers each block of 64 bits independently."
  },
  {
    "slide_number": 81,
    "type": "flashcard",
    "question": "What does Cipher Block Chaining Mode (CBC) require for the first block?",
    "answer": "An initialization vector."
  },
  {
    "slide_number": 81,
    "type": "flashcard",
    "question": "Describe the Encrypt-Decrypt-Encrypt Mode used in financial institutions.",
    "answer": "It uses two keys (k, k') and the process is c = DESk(DESk’–1(DESk(m)))."
  },
  {
    "slide_number": 81,
    "type": "flashcard",
    "question": "How does the Encrypt-Encrypt-Encrypt Mode differ from the Encrypt-Decrypt-Encrypt Mode?",
    "answer": "Encrypt-Encrypt-Encrypt Mode uses three keys (k, k', k'') and the process is c = DESk(DESk’(DESk’’(m)))."
  },
  {
    "slide_number": 82,
    "type": "flashcard",
    "question": "What is the encryption mode used in Fall 2024 Cp 571 as described on slide 82?",
    "answer": "CBC (Cipher Block Chaining) Mode Encryption"
  },
  {
    "slide_number": 82,
    "type": "flashcard",
    "question": "In CBC mode encryption, what operation is performed between the initialization vector and the first plaintext block m1?",
    "answer": "An XOR operation () is performed between the initialization vector and the first plaintext block m1."
  },
  {
    "slide_number": 82,
    "type": "flashcard",
    "question": "What cryptographic algorithm is used in the process described on slide 82?",
    "answer": "DES (Data Encryption Standard)"
  },
  {
    "slide_number": 83,
    "type": "flashcard",
    "question": "What was the major flaw of DES that led to its successor being selected?",
    "answer": "DES was vulnerable to attacks and could be broken in a few days, leading to the selection of Rijndael as its successor for the Advanced Encryption Standard (AES) in 2001."
  },
  {
    "slide_number": 83,
    "type": "flashcard",
    "question": "When was the original DES officially withdrawn?",
    "answer": "The original DES was officially withdrawn in 2005."
  },
  {
    "slide_number": 83,
    "type": "flashcard",
    "question": "What is the only approved implementation of DES after its withdrawal?",
    "answer": "The only approved implementation of DES after its withdrawal is triple DES."
  },
  {
    "slide_number": 84,
    "type": "flashcard",
    "question": "What is the Advanced Encryption Standard (AES) and what does it replace?",
    "answer": "AES is a relatively new symmetric-key NIST standard that replaces DES."
  },
  {
    "slide_number": 84,
    "type": "flashcard",
    "question": "What is the original name of AES and what type of data blocks does it process?",
    "answer": "The original name of AES is Dutch-Rijndael, and it processes data in 128-bit (16-byte) blocks."
  },
  {
    "slide_number": 84,
    "type": "flashcard",
    "question": "How many key sizes does AES support and how does the number of rounds relate to the key length?",
    "answer": "AES supports 128, 192, or 256-bit keys, and the number of rounds is a function of the key length."
  },
  {
    "slide_number": 84,
    "type": "flashcard",
    "question": "How long does brute force decryption of AES take compared to DES?",
    "answer": "Brute force decryption taking 1 second on DES would take 149 trillion years for AES."
  },
  {
    "slide_number": 85,
    "type": "flashcard",
    "question": "What is the block size that AES encrypts?",
    "answer": "AES encrypts blocks of 128 bits (16 bytes)."
  },
  {
    "slide_number": 85,
    "type": "flashcard",
    "question": "How many rounds does AES perform with a 192-bit key?",
    "answer": "AES performs 12 rounds with a 192-bit key."
  },
  {
    "slide_number": 85,
    "type": "flashcard",
    "question": "What operations does AES use in its cipher process?",
    "answer": "AES performs both substitution and transposition (permutation) on the bits."
  },
  {
    "slide_number": 86,
    "type": "flashcard",
    "question": "What is the structure of the state array in AES encryption?",
    "answer": "The state array is a 4x4 byte matrix."
  },
  {
    "slide_number": 86,
    "type": "flashcard",
    "question": "How many bytes does each AES round key have?",
    "answer": "Each AES round key has 16 bytes (128 bits)."
  },
  {
    "slide_number": 86,
    "type": "flashcard",
    "question": "What is the first step in the AES encryption process?",
    "answer": "The plaintext input is placed into a state array and combined with the zero-th round key."
  },
  {
    "slide_number": 87,
    "type": "flashcard",
    "question": "What is the first step in a round of AES encryption?",
    "answer": "The first step is combining the input with the zero-th round key using an XOR operation, known as AddRoundKey."
  },
  {
    "slide_number": 87,
    "type": "flashcard",
    "question": "What operation is used to substitute new values for each byte of the state array in AES encryption?",
    "answer": "The Rijndael S-box is used in the SubBytes operation to substitute new values for each byte of the state array."
  },
  {
    "slide_number": 87,
    "type": "flashcard",
    "question": "How are the contents of rows shifted in the ShiftRows step of AES encryption?",
    "answer": "The contents of the rows are cyclically shifted by 0, 1, 2, or 3 byte positions, depending on the row number."
  },
  {
    "slide_number": 88,
    "type": "flashcard",
    "question": "What is the purpose of the MixColumns step in the AES encryption round?",
    "answer": "The MixColumns step alters each column independently using matrix multiplication with a known matrix c(x), except in the last round."
  },
  {
    "slide_number": 88,
    "type": "flashcard",
    "question": "What operation is performed after the MixColumns step in an AES encryption round?",
    "answer": "After the MixColumns step, the result is XORed with the round key in the AddRoundKey step."
  },
  {
    "slide_number": 89,
    "type": "flashcard",
    "question": "What are the main steps of AES encryption after the initial round key addition?",
    "answer": "The main steps of AES encryption after the initial round key addition are SubBytes, ShiftRows, MixColumns, and AddRoundKey."
  },
  {
    "slide_number": 90,
    "type": "flashcard",
    "question": "What is the first step in the AES decryption round process?",
    "answer": "Rows are cyclically shifted in inverse rotation using InvShiftRows."
  },
  {
    "slide_number": 90,
    "type": "flashcard",
    "question": "How does InvSubBytes work in AES decryption?",
    "answer": "InvSubBytes reverses the SubBytes operation using S-boxes that are inverse to the ones used in SubBytes."
  },
  {
    "slide_number": 90,
    "type": "flashcard",
    "question": "What is the purpose of the InvMixColumns step in AES decryption?",
    "answer": "InvMixColumns alters each column independently as the inverse of the MixColumn operation, but it is not done in the last round."
  },
  {
    "slide_number": 91,
    "type": "flashcard",
    "question": "What is a key design difference between AES and DES?",
    "answer": "AES was designed to withstand attacks that DES is vulnerable to, and all design decisions of AES are made public."
  },
  {
    "slide_number": 91,
    "type": "flashcard",
    "question": "How does AES ensure that every bit in the state array is independent after 2 rounds?",
    "answer": "After 2 successive rounds, every bit in the AES state array depends on every bit in the state array 2 rounds ago."
  },
  {
    "slide_number": 91,
    "type": "flashcard",
    "question": "Does AES have weak or semi-weak keys like DES?",
    "answer": "No, AES does not have weak or semi-weak keys like DES."
  },
  {
    "slide_number": 92,
    "type": "flashcard",
    "question": "Which modes used with DES are also compatible with AES?",
    "answer": "DES modes also work with AES."
  },
  {
    "slide_number": 92,
    "type": "flashcard",
    "question": "Why are EDE and 'Triple-AES' not used with AES?",
    "answer": "The extended block size of AES makes EDE and 'Triple-AES' unnecessary."
  },
  {
    "slide_number": 92,
    "type": "flashcard",
    "question": "What new mode was added to AES?",
    "answer": "The new counter mode CTR was added to AES."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "Who developed Blowfish and when?",
    "answer": "Blowfish was developed by B. Schneier in 1993."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "What operations does Blowfish use?",
    "answer": "Blowfish uses binary addition, XOR function, and 32-bit table lookup."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "How much memory does Blowfish require and how many rounds are needed for subkey generation?",
    "answer": "Blowfish fits in 5Kbytes of memory and needs 521 rounds for subkey generation."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "Why is Blowfish not suitable for frequent key changes?",
    "answer": "Blowfish is not suitable for frequent key changes due to its complex subkey generation process."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "What type of cipher is RC4 and how does it operate?",
    "answer": "RC4 is a stream cipher which operates on bytes, using a key as input in a random number generator and outputting XOR-ed bytes."
  },
  {
    "slide_number": 93,
    "type": "flashcard",
    "question": "What is a notable characteristic of RC4 in terms of performance?",
    "answer": "RC4 runs quickly in software."
  },
  {
    "slide_number": 94,
    "type": "flashcard",
    "question": "What is the Blowfish encryption algorithm known for in terms of licensing?",
    "answer": "Blowfish is unpatented, license-free, available for all uses, and placed in the public domain."
  },
  {
    "slide_number": 94,
    "type": "flashcard",
    "question": "How does Blowfish compare to modern block ciphers in terms of block size?",
    "answer": "Blowfish has a smaller block size compared to modern block ciphers like AES or Twofish, which have larger block sizes."
  },
  {
    "slide_number": 94,
    "type": "flashcard",
    "question": "What was a common issue with encryption algorithms at the time Blowfish was developed?",
    "answer": "Many encryption algorithms were proprietary, encumbered by patents, or kept as government secrets."
  },
  {
    "slide_number": 95,
    "type": "flashcard",
    "question": "What is the block size and default key length of the Blowfish algorithm?",
    "answer": "Blowfish has a 64-bit block size and a default key length of 128 bits."
  },
  {
    "slide_number": 95,
    "type": "flashcard",
    "question": "How many rounds of encryption does the Blowfish algorithm use?",
    "answer": "The Blowfish algorithm uses 16 rounds of encryption."
  },
  {
    "slide_number": 95,
    "type": "flashcard",
    "question": "What does the P-array in the Blowfish algorithm contain?",
    "answer": "The P-array contains 18 instances of 32-bit subkeys."
  },
  {
    "slide_number": 96,
    "type": "flashcard",
    "question": "How many subkey arrays does Blowfish have, and what are they?",
    "answer": "Blowfish has five subkey arrays: one 18-entry P-array and four 256-bit entry S-boxes (S0, S1, S2, and S3)."
  },
  {
    "slide_number": 96,
    "type": "flashcard",
    "question": "What size of input and output does each S-box in Blowfish handle?",
    "answer": "Each S-box in Blowfish is fed by an 8-bit input and produces a 32-bit output."
  },
  {
    "slide_number": 96,
    "type": "flashcard",
    "question": "What do the entries in the S-boxes represent in Blowfish?",
    "answer": "Each line into an S-box in Blowfish represents 32 bits."
  },
  {
    "slide_number": 97,
    "type": "flashcard",
    "question": "What is the purpose of the P-array entries in the Blowfish algorithm during encryption?",
    "answer": "One entry of the P-array is used every round, and after the final round, each half of the data block is XORed with one of the two remaining unused P-entries."
  },
  {
    "slide_number": 97,
    "type": "flashcard",
    "question": "How is the input block divided in the Blowfish algorithm?",
    "answer": "The input block is divided into halves XL and XR."
  },
  {
    "slide_number": 97,
    "type": "flashcard",
    "question": "What is the final operation performed on XL and XR after the last round in the Blowfish algorithm?",
    "answer": "After the last round, XR is XORed with P17, XL is XORed with P18, and then XR and XL are recombined."
  },
  {
    "slide_number": 98,
    "type": "flashcard",
    "question": "What does the F function in Blowfish's algorithm do?",
    "answer": "The F function splits the 32-bit input into four eight-bit quarters, uses these as input to the S-boxes, adds the outputs modulo 232, and XORs them to produce the final 32-bit output."
  },
  {
    "slide_number": 98,
    "type": "flashcard",
    "question": "How is decryption performed in Blowfish's algorithm?",
    "answer": "Decryption in Blowfish is performed by reversing the order of sub-keys Pi and XORing P17 and P18 to the ciphertext block, then using the P-entries in reverse order."
  },
  {
    "slide_number": 98,
    "type": "flashcard",
    "question": "What characteristic of Blowfish allows it to be easily inverted?",
    "answer": "Blowfish is a Feistel network, which allows it to be inverted by simply XORing specific keys to the ciphertext block and using the sub-keys in reverse order."
  },
  {
    "slide_number": 99,
    "type": "flashcard",
    "question": "What is the initial step in the Blowfish key expansion process?",
    "answer": "The initial step is to initialize the P-array and S-boxes with values derived from the hexadecimal digits of pi, which contain no obvious pattern."
  },
  {
    "slide_number": 99,
    "type": "flashcard",
    "question": "How is the P-array modified during the Blowfish key expansion?",
    "answer": "The P-array is XORed with the key bits, circling through the key until the whole P-array is XORed with the key bits."
  },
  {
    "slide_number": 99,
    "type": "flashcard",
    "question": "How many times is the process repeated to calculate new subkeys for the P-array and S-boxes in the Blowfish key expansion?",
    "answer": "The process is repeated 521 times to calculate new subkeys for the P-array and the four S-boxes."
  },
  {
    "slide_number": 100,
    "type": "flashcard",
    "question": "What is the initial step in Blowfish's key schedule?",
    "answer": "The initial step involves initializing the P-array and S-boxes with values derived from the hexadecimal digits of pi."
  },
  {
    "slide_number": 100,
    "type": "flashcard",
    "question": "How is the secret key integrated into Blowfish's key schedule?",
    "answer": "The secret key is XORed with the P-entries in order, cycling the key if necessary."
  },
  {
    "slide_number": 100,
    "type": "flashcard",
    "question": "How many times does the Blowfish algorithm run to generate all the subkeys?",
    "answer": "The Blowfish algorithm runs 521 times to generate all the subkeys."
  },
  {
    "slide_number": 101,
    "type": "flashcard",
    "question": "What is a Feistel cipher and who is it named after?",
    "answer": "A Feistel cipher is an asymmetric structure used in the construction of block ciphers, named after cryptographer Horst Feistel."
  },
  {
    "slide_number": 101,
    "type": "flashcard",
    "question": "Which block ciphers use the Feistel network scheme?",
    "answer": "Block ciphers that use the Feistel network scheme include the US Data Encryption Standard, the Soviet/Russian GOST, and the more recent Blowfish and Twofish ciphers."
  },
  {
    "slide_number": 101,
    "type": "flashcard",
    "question": "How do encryption and decryption work in a Feistel cipher?",
    "answer": "In a Feistel cipher, encryption and decryption are very similar operations, both consisting of iteratively running a round function a fixed number of times."
  },
  {
    "slide_number": 102,
    "type": "flashcard",
    "question": "What is AEdit?",
    "answer": "AEdit is a free Windows word processor that incorporates text encryption."
  },
  {
    "slide_number": 102,
    "type": "flashcard",
    "question": "What functionality does Coolfish provide?",
    "answer": "Coolfish is an encrypting text editor for Windows."
  },
  {
    "slide_number": 102,
    "type": "flashcard",
    "question": "What is the main feature of Foopchat?",
    "answer": "Foopchat offers encrypted chat and advanced file sharing using a client/server architecture."
  },
  {
    "slide_number": 102,
    "type": "flashcard",
    "question": "What platform is JFile by Land-J Technologies designed for?",
    "answer": "JFile by Land-J Technologies is a database program designed for the PalmOS platform."
  },
  {
    "slide_number": 102,
    "type": "flashcard",
    "question": "What services does Freedom by Zero-Knowledge offer privacy for?",
    "answer": "Freedom by Zero-Knowledge offers privacy for web browsing, e-mail, chat, telnet, and newsgroups."
  },
  {
    "slide_number": 103,
    "type": "flashcard",
    "question": "What are the main differences between IDEA and DES encryption algorithms?",
    "answer": "IDEA was developed to replace DES because DES's 56-bit key size is too small by current standards, making it vulnerable to being searched in approximately 22 hours."
  },
  {
    "slide_number": 103,
    "type": "flashcard",
    "question": "Who designed the IDEA encryption algorithm and when?",
    "answer": "IDEA was designed by Xuejia Lai and James L. Massey in 1991."
  },
  {
    "slide_number": 103,
    "type": "flashcard",
    "question": "What was IDEA initially called and what was its purpose?",
    "answer": "IDEA was initially called IPES (Improved PES) and was developed to replace DES."
  },
  {
    "slide_number": 103,
    "type": "flashcard",
    "question": "In what cryptosystem was IDEA used as the symmetric cipher?",
    "answer": "IDEA was used as the symmetric cipher in early versions of the Pretty Good Privacy cryptosystem."
  },
  {
    "slide_number": 104,
    "type": "flashcard",
    "question": "What is the block size and key size of the IDEA encryption algorithm?",
    "answer": "IDEA operates with 64-bit plaintext and cipher text blocks and is controlled by a 128-bit key."
  },
  {
    "slide_number": 104,
    "type": "flashcard",
    "question": "What three algebraic functions are used in the IDEA algorithm?",
    "answer": "The IDEA algorithm uses XOR, addition modulo 2^16, and multiplication modulo 2^16 + 1."
  },
  {
    "slide_number": 104,
    "type": "flashcard",
    "question": "How does the IDEA algorithm ensure that the encryption process is identical to the decryption process?",
    "answer": "The IDEA algorithm ensures that the encryption process is identical to the decryption process by using different key sub-blocks."
  },
  {
    "slide_number": 105,
    "type": "flashcard",
    "question": "How is a 64-bit plaintext block partitioned in the key generation process?",
    "answer": "It is partitioned into four 16-bit sub-blocks: X1, X2, X3, X4."
  },
  {
    "slide_number": 105,
    "type": "flashcard",
    "question": "How many rounds are there in the IDEA encryption process?",
    "answer": "There are 8 rounds."
  },
  {
    "slide_number": 105,
    "type": "flashcard",
    "question": "How many subkeys does IDEA use, and how are they distributed?",
    "answer": "IDEA uses 52 subkeys: six for each of the 8 rounds, and the last four are used for output transformation."
  },
  {
    "slide_number": 106,
    "type": "flashcard",
    "question": "How many 16-bit subkeys are generated from a 128-bit key for the first two rounds?",
    "answer": "For the first round, 6 subkeys and for the second round, 2 subkeys are generated, totaling 8 subkeys."
  },
  {
    "slide_number": 106,
    "type": "flashcard",
    "question": "What is the process of generating subkeys after the initial partitioning?",
    "answer": "The key is rotated 25 bits to the left and divided into 8 subkeys. This process is repeated for 8 rounds until 52 subkeys are generated."
  },
  {
    "slide_number": 106,
    "type": "flashcard",
    "question": "How many 16-bit key sub-blocks are generated in total?",
    "answer": "A total of 52 16-bit key sub-blocks are generated."
  },
  {
    "slide_number": 107,
    "type": "flashcard",
    "question": "What is the purpose of key sub-blocks in encryption and decryption?",
    "answer": "Key sub-blocks are used for the encryption and decryption processes in individual rounds of a cryptographic algorithm."
  },
  {
    "slide_number": 108,
    "type": "flashcard",
    "question": "What operations are used to combine the first four 16-bit key sub-blocks with the plaintext blocks during encryption?",
    "answer": "Addition modulo 2^16 and multiplication modulo 2^16 + 1."
  },
  {
    "slide_number": 108,
    "type": "flashcard",
    "question": "How many 16-bit values are produced at the end of the first encryption round?",
    "answer": "Four 16-bit values."
  },
  {
    "slide_number": 108,
    "type": "flashcard",
    "question": "How many encryption rounds are there in total?",
    "answer": "There are 8 encryption rounds."
  },
  {
    "slide_number": 109,
    "type": "flashcard",
    "question": "What is the main difference in the key sub-blocks used for decryption compared to encryption?",
    "answer": "Each of the 52 16-bit key sub-blocks used for decryption is the inverse of the key sub-block used during encryption."
  },
  {
    "slide_number": 109,
    "type": "flashcard",
    "question": "In what order must the key sub-blocks be used during decryption?",
    "answer": "The key sub-blocks must be used in reverse order during decryption to reverse the encryption process."
  },
  {
    "slide_number": 110,
    "type": "flashcard",
    "question": "What are the modes of operation supported by IDEA?",
    "answer": "IDEA supports Electronic Code Book (ECB) mode, Cipher Block Chaining (CBC), Cipher Feedback (CFB), and Output Feedback (OFB) modes."
  },
  {
    "slide_number": 110,
    "type": "flashcard",
    "question": "Why is Electronic Code Book (ECB) mode not recommended for small block sizes?",
    "answer": "ECB mode is not recommended for small block sizes (smaller than 40 bits) because it encrypts each block of plaintext separately, which can lead to patterns being discernible in the ciphertext."
  },
  {
    "slide_number": 111,
    "type": "flashcard",
    "question": "What are some market areas where IDEA-based security solutions are available?",
    "answer": "Financial Services, Broadcasting, and Government."
  },
  {
    "slide_number": 111,
    "type": "flashcard",
    "question": "In which fields can the IDEA algorithm be used for data protection?",
    "answer": "Audio and video data for cable TV, pay TV, video conferencing, distance learning, sensitive financial and commercial data, email via public networks, and smart cards."
  },
  {
    "slide_number": 111,
    "type": "flashcard",
    "question": "How can the IDEA algorithm be utilized in encryption software?",
    "answer": "It can be easily embedded to protect data transmission and storage."
  },
  {
    "slide_number": 112,
    "type": "flashcard",
    "question": "What was the primary motivation for the development of PGP?",
    "answer": "The primary motivation for the development of PGP was to achieve maximum security for electronic communications."
  },
  {
    "slide_number": 112,
    "type": "flashcard",
    "question": "Which encryption algorithm was initially chosen for PGP to ensure data protection?",
    "answer": "IDEA was initially chosen for PGP to ensure data protection."
  },
  {
    "slide_number": 112,
    "type": "flashcard",
    "question": "What were the fundamental criteria for developing the IDEA encryption algorithm?",
    "answer": "The fundamental criteria for developing IDEA were military strength for all security requirements and easy hardware and software implementation."
  },
  {
    "slide_number": 113,
    "type": "flashcard",
    "question": "What is the course code mentioned on Slide 113?",
    "answer": "Cp 571"
  },
  {
    "slide_number": 113,
    "type": "flashcard",
    "question": "Which semester is referred to in Slide 113?",
    "answer": "Fall 2024"
  },
  {
    "slide_number": 114,
    "type": "flashcard",
    "question": "What is a potential problem with symmetric ciphers?",
    "answer": "A potential problem with symmetric ciphers is that they use the same key for both encryption and decryption, which can pose security risks if the key is compromised."
  },
  {
    "slide_number": 114,
    "type": "flashcard",
    "question": "Who can be responsible for key selection in symmetric encryption?",
    "answer": "Key selection can be made by one of the parties involved in the communication or by a trusted third party."
  },
  {
    "slide_number": 114,
    "type": "flashcard",
    "question": "What are the methods of key distribution in symmetric encryption?",
    "answer": "Key distribution may involve physical delivery or electronic delivery using encrypted communication, which requires another key or keys to be already in use."
  },
  {
    "slide_number": 115,
    "type": "flashcard",
    "question": "Why was the NSA able to decrypt the Soviet VENONA traffic?",
    "answer": "Because the Soviets reused one-time pads that should have been destroyed, allowing the NSA to eventually decrypt the messages."
  },
  {
    "slide_number": 115,
    "type": "flashcard",
    "question": "What is a critical security practice when using one-time pads?",
    "answer": "One-time pads should be destroyed securely after use to prevent reuse and ensure security."
  },
  {
    "slide_number": 115,
    "type": "flashcard",
    "question": "What lesson is emphasized about key management in secure communications?",
    "answer": "Keys must be exchanged, stored, and destroyed securely to maintain the integrity and confidentiality of secure communications."
  },
  {
    "slide_number": 116,
    "type": "flashcard",
    "question": "What is the purpose of a permanent key in computer or smartphone communications?",
    "answer": "A permanent key is used for important communications and to exchange session keys."
  },
  {
    "slide_number": 116,
    "type": "flashcard",
    "question": "What is a session key and how is it used in communication?",
    "answer": "A session key is a temporary key created for each session, used to encrypt data during that session, and exchanged using a permanent key."
  },
  {
    "slide_number": 116,
    "type": "flashcard",
    "question": "Why is it difficult for an eavesdropper to benefit from intercepting a session key?",
    "answer": "Because a session key is temporary and short-lived, making it difficult to guess and not useful beyond the session it was created for."
  },
  {
    "slide_number": 117,
    "type": "flashcard",
    "question": "What is unicity distance in cryptography?",
    "answer": "Unicity distance is the length of an original ciphertext needed to break the cipher by reducing the number of possible spurious keys to zero in a brute force attack. It is the expected amount of ciphertext needed to determine the key completely, assuming the underlying message has redundancy."
  },
  {
    "slide_number": 117,
    "type": "flashcard",
    "question": "Who invented the concept of unicity distance and when?",
    "answer": "Claude Shannon invented the concept of unicity distance in the 1940s."
  },
  {
    "slide_number": 117,
    "type": "flashcard",
    "question": "What factors does the unicity distance depend on?",
    "answer": "The unicity distance depends on the characteristics of the plaintext and the key length of the encryption algorithm."
  },
  {
    "slide_number": 118,
    "type": "flashcard",
    "question": "What does the unicity distance represent in cryptanalysis?",
    "answer": "The unicity distance represents the minimum amount of ciphertext needed to uniquely determine the encryption key."
  },
  {
    "slide_number": 118,
    "type": "flashcard",
    "question": "Why is it impossible to decode a message without additional information in a Vigenère cipher?",
    "answer": "Because multiple keys can produce valid English words from the ciphertext, making it difficult to identify the correct key without additional information."
  },
  {
    "slide_number": 118,
    "type": "calculation",
    "question": "How is the unicity distance (U) calculated for a substitution cipher with an entropy of 88.4 bits?",
    "answer": "The unicity distance (U) is calculated as the entropy of the key space (H(k)) divided by the redundancy (D): U = H(k)/D = 88.4/3.2 = 28 characters."
  },
  {
    "slide_number": 119,
    "type": "flashcard",
    "question": "What is the title of the course CPS571?",
    "answer": "Introduction to Cyber-Security"
  },
  {
    "slide_number": 120,
    "type": "flashcard",
    "question": "What is a message authentication code and why is it important?",
    "answer": "A message authentication code (MAC) is a short piece of information used to authenticate a message and ensure its integrity and authenticity. It is important because it verifies that the message has not been altered and confirms the sender's identity."
  },
  {
    "slide_number": 121,
    "type": "flashcard",
    "question": "What is a Message Authentication Code (MAC) used for?",
    "answer": "A MAC uses a shared secret key and can tell you if a message has been tampered with, but it does not protect privacy."
  },
  {
    "slide_number": 121,
    "type": "flashcard",
    "question": "Do MACs protect message privacy?",
    "answer": "No, MACs do not protect message privacy; they are used to detect message tampering."
  },
  {
    "slide_number": 121,
    "type": "flashcard",
    "question": "What is typically used in the creation of a MAC?",
    "answer": "MACs typically use some kind of hash function."
  },
  {
    "slide_number": 122,
    "type": "flashcard",
    "question": "What is a one-way hash function?",
    "answer": "A one-way hash function uses a one-way function to produce a message digest or 'fingerprint' that is simple to compute in one direction but infeasible or impossible to reverse."
  },
  {
    "slide_number": 122,
    "type": "flashcard",
    "question": "What is a key characteristic of the message digest produced by a one-way hash function?",
    "answer": "The message digest usually has a fixed length regardless of the length of the input message."
  },
  {
    "slide_number": 122,
    "type": "flashcard",
    "question": "Why are cryptographic hash functions preferred over encryption algorithms like DES for certain applications?",
    "answer": "Cryptographic hash functions execute faster in software than encryption algorithms like DES, and the code is widely available."
  },
  {
    "slide_number": 123,
    "type": "flashcard",
    "question": "Where were Unix passwords initially kept?",
    "answer": "Unix passwords were initially kept in /etc/passwd in plain sight."
  },
  {
    "slide_number": 123,
    "type": "flashcard",
    "question": "What is the purpose of adding 'salt' to a password?",
    "answer": "The 'salt' is a string added to the password before hashing to enhance security."
  },
  {
    "slide_number": 123,
    "type": "flashcard",
    "question": "Where are Unix password hashes now kept?",
    "answer": "Unix password hashes are now kept in /etc/shadow."
  },
  {
    "slide_number": 124,
    "type": "flashcard",
    "question": "What is the purpose of a cryptographic checksum?",
    "answer": "A cryptographic checksum is used to check if a message was changed in transit by generating a set of k bits from a set of n bits, where k is smaller than n except in unusual circumstances."
  },
  {
    "slide_number": 124,
    "type": "flashcard",
    "question": "What does the parity bit in ASCII represent?",
    "answer": "The parity bit in ASCII, which is the 8th bit, is used for error checking. It can represent even parity (even number of 1 bits) or odd parity (odd number of 1 bits)."
  },
  {
    "slide_number": 125,
    "type": "flashcard",
    "question": "What does even parity imply about the number of 1 bits in a correctly received message?",
    "answer": "Even parity implies that the number of 1 bits in a correctly received message is even."
  },
  {
    "slide_number": 125,
    "type": "flashcard",
    "question": "How many 1 bits are in the bit sequence '10111101'?",
    "answer": "There are 6 1 bits in the bit sequence '10111101'."
  },
  {
    "slide_number": 125,
    "type": "flashcard",
    "question": "Why would an odd parity check indicate an error in the bit sequence '10111101'?",
    "answer": "An odd parity check indicates an error because the sequence '10111101' has an even number of 1 bits, which does not match the odd parity requirement."
  },
  {
    "slide_number": 126,
    "type": "flashcard",
    "question": "What is a cryptographic checksum?",
    "answer": "A cryptographic checksum is a function h: A->B where for any x in A, h(x)=y is easy to compute, but it is computationally infeasible to find x in A such that h(x) = y for any y in B."
  },
  {
    "slide_number": 126,
    "type": "flashcard",
    "question": "What is a collision attack in the context of cryptographic checksums?",
    "answer": "A collision attack is when it is computationally infeasible to find two different documents x, x' in A such that they have the same hash: h(x) = h(x')."
  },
  {
    "slide_number": 126,
    "type": "flashcard",
    "question": "Why is a birthday attack more difficult than a collision attack?",
    "answer": "A birthday attack is more difficult than a collision attack because the hash of the target document h(x) is given, making it harder to find a different document with the same hash."
  },
  {
    "slide_number": 127,
    "type": "flashcard",
    "question": "What is the minimum number of people required in a room for the probability that any two people share the same birthday to be greater than 0.5?",
    "answer": "23"
  },
  {
    "slide_number": 127,
    "type": "flashcard",
    "question": "What is the probability of two people having the same birthday?",
    "answer": "1/365"
  },
  {
    "slide_number": 127,
    "type": "flashcard",
    "question": "How many people are needed in a room (including yourself) for the probability that someone shares your birthday to be greater than 0.5?",
    "answer": "253"
  },
  {
    "slide_number": 128,
    "type": "flashcard",
    "question": "What defines a collision in the context of hash functions?",
    "answer": "A collision occurs when two different inputs (x and x') produce the same hash output, i.e., h(x) = h(x')."
  },
  {
    "slide_number": 128,
    "type": "calculation",
    "question": "If there are 32 files and 8 possible cryptographic checksum values, how many files at minimum will share the same hash value?",
    "answer": "At least 4 files will share the same hash value."
  },
  {
    "slide_number": 128,
    "type": "flashcard",
    "question": "How is the probability of a collision related to the size of the hash?",
    "answer": "The probability of a collision is inversely proportional to the size of the hash."
  },
  {
    "slide_number": 129,
    "type": "flashcard",
    "question": "What is a keyed cryptographic checksum and provide an example?",
    "answer": "A keyed cryptographic checksum requires a cryptographic key to function. An example is using AES in chaining mode to encipher a message and use the last n-bits."
  },
  {
    "slide_number": 129,
    "type": "flashcard",
    "question": "Name two keyless cryptographic checksums that are currently in use.",
    "answer": "SHA-512 and SHA-3 are keyless cryptographic checksums currently in use."
  },
  {
    "slide_number": 129,
    "type": "flashcard",
    "question": "What is HMAC and how does it relate to keyless cryptographic checksums?",
    "answer": "HMAC is a keyless cryptographic checksum that combines a hash function with a key."
  },
  {
    "slide_number": 130,
    "type": "flashcard",
    "question": "What is the digest size of the MD5 hash function?",
    "answer": "128 bits"
  },
  {
    "slide_number": 130,
    "type": "flashcard",
    "question": "What is the block size used by the MD5 hash function?",
    "answer": "512 bits"
  },
  {
    "slide_number": 130,
    "type": "flashcard",
    "question": "Who designed the MD5 hash function and how many rounds does it have?",
    "answer": "MD5 was designed by Ronald Rivest and it has 4 rounds."
  },
  {
    "slide_number": 131,
    "type": "flashcard",
    "question": "What is the fixed-length output of the MD5 algorithm?",
    "answer": "128 bits"
  },
  {
    "slide_number": 131,
    "type": "flashcard",
    "question": "How is the input message processed in the MD5 algorithm?",
    "answer": "The input message is broken up into chunks of 512-bit blocks, each containing sixteen 32-bit words."
  },
  {
    "slide_number": 131,
    "type": "flashcard",
    "question": "What is the main purpose of the 128-bit state in the MD5 algorithm?",
    "answer": "The 128-bit state, divided into four 32-bit words (A, B, C, and D), is used by the main algorithm to modify the state using each 512-bit message block."
  },
  {
    "slide_number": 132,
    "type": "flashcard",
    "question": "What are A, B, C, and D in the MD5 compression function?",
    "answer": "A, B, C, and D are 32-bit words of the state."
  },
  {
    "slide_number": 132,
    "type": "flashcard",
    "question": "What does '⋘n' denote in the MD5 compression function?",
    "answer": "'⋘n' denotes a left bit rotation by n places, where n varies for each operation."
  },
  {
    "slide_number": 132,
    "type": "flashcard",
    "question": "In the MD5 compression function, what does '⊞' represent?",
    "answer": "'⊞' denotes addition modulo 2^32."
  },
  {
    "slide_number": 133,
    "type": "flashcard",
    "question": "What is the hash function example mentioned on slide 133?",
    "answer": "MD5"
  },
  {
    "slide_number": 133,
    "type": "flashcard",
    "question": "How many possible functions are there in the MD5 hash function example?",
    "answer": "Four possible functions."
  },
  {
    "slide_number": 133,
    "type": "flashcard",
    "question": "How are the functions used in the MD5 hash function example?",
    "answer": "A different function is used in each round."
  },
  {
    "slide_number": 134,
    "type": "flashcard",
    "question": "What is the bit size of the hash value produced by SHA-1?",
    "answer": "160-bit (20-byte)"
  },
  {
    "slide_number": 134,
    "type": "flashcard",
    "question": "Who designed the SHA-1 hash function?",
    "answer": "The United States National Security Agency (NSA)."
  },
  {
    "slide_number": 134,
    "type": "flashcard",
    "question": "Despite being cryptographically broken, where is SHA-1 still widely used?",
    "answer": "SHA-1 is still used in security applications and protocols like TLS, SSL, PGP, SSH, S/MIME, and IPsec."
  },
  {
    "slide_number": 135,
    "type": "flashcard",
    "question": "What are the 32-bit words used in the SHA-1 compression function iteration?",
    "answer": "The 32-bit words are A, B, C, D, and E."
  },
  {
    "slide_number": 135,
    "type": "flashcard",
    "question": "What does the symbol ⋘n denote in the context of SHA-1?",
    "answer": "⋘n denotes a left bit rotation by n places."
  },
  {
    "slide_number": 135,
    "type": "flashcard",
    "question": "What operation does the symbol ⊞ represent in SHA-1?",
    "answer": "⊞ represents addition modulo 2^32."
  },
  {
    "slide_number": 136,
    "type": "flashcard",
    "question": "What is the primary problem that message authentication codes (MAC) aim to solve?",
    "answer": "The problem is that an attacker can intercept a message, change it, and re-compute the hash."
  },
  {
    "slide_number": 136,
    "type": "flashcard",
    "question": "How does HMAC defend against the interception and alteration of messages?",
    "answer": "HMAC uses keyed cryptographic checksums derived from keyless cryptographic checksums to provide message integrity and authenticity."
  },
  {
    "slide_number": 136,
    "type": "flashcard",
    "question": "What are 'ipad' and 'opad' in the context of HMAC?",
    "answer": "'ipad' is the constant 00110110 repeated b times, and 'opad' is the constant 01011100 repeated b times."
  },
  {
    "slide_number": 136,
    "type": "flashcard",
    "question": "Describe the HMAC formula.",
    "answer": "HMAC is computed as h(k, m) = h(k' xor opad || h(k' xor ipad || m)), where xor denotes exclusive or and || denotes concatenation."
  },
  {
    "slide_number": 137,
    "type": "flashcard",
    "question": "What does the strength of HMAC depend on?",
    "answer": "The strength of HMAC depends on the strength of the hash function used."
  },
  {
    "slide_number": 137,
    "type": "flashcard",
    "question": "Which HMAC versions have known attacks that can recover partial or full keys?",
    "answer": "HMAC-MD4, HMAC-MD5, HMAC-SHA-0, and HMAC-SHA-1 have known attacks that can recover partial or full keys."
  },
  {
    "slide_number": 138,
    "type": "flashcard",
    "question": "What are the key aspects of message integrity in networking?",
    "answer": "1. Content of message has not been altered. 2. Source of message is who/what you think it is. 3. Message has not been replayed. 4. Sequence of messages is maintained."
  },
  {
    "slide_number": 138,
    "type": "flashcard",
    "question": "What is a message digest and why is it important in networking?",
    "answer": "A message digest is a cryptographic hash function that produces a fixed-size output from input data. It is important for ensuring the integrity and authenticity of messages in networking."
  },
  {
    "slide_number": 139,
    "type": "flashcard",
    "question": "What is an alternative to HMAC for message authentication?",
    "answer": "Keyed hash, also known as Message Authentication Code (MAC) without encryption."
  },
  {
    "slide_number": 139,
    "type": "flashcard",
    "question": "What does the notation MDm = H(s||m) represent?",
    "answer": "It represents the computation of a message digest (MDm) using a hash function H, a shared secret key s, and a message m."
  },
  {
    "slide_number": 139,
    "type": "flashcard",
    "question": "What are the two main purposes of using a Message Authentication Code (MAC) in the context of keyed hash?",
    "answer": "To authenticate the sender and verify message integrity."
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