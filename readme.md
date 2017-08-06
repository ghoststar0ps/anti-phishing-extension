# Anti-Phishing Chrome Extension
Give the user a hint about whether they're on a phishing site.

--------------------

The premise is simple: you can alert a user to phishing attempts by closing the gap between *sites that they think they've been to* and *sites they've actually been to*.


                                User thinks they're         User thinks they're on a
                                on a new website            website they frequent
                                ________________            _____________________

    User has been to this    |   User has amnesia           User is safe
    site many times before   |

    User is on a site        |   User is cautious           USER GETS PHISHED
    for the first time       |



By checking the domain of the site they're currently on against their browsing history, you can show users when they're on a new site for the first time.

It won't seem suspicious if the user knows this is a new website, but could alert them if they're expecting to be taken to a site they've been to before (ie clicking a link in a phishing email to a hacker-controlled site that looks like their bank's website.)

## Known Problems

Chrome doesn't give extensions access to history data from before the extension is installed, meaning that new users will see warnings for every site they visit initially. This is very problematic and will likely lead to uninstalls and users ignoring or not trusting warnings.

I've attempted to mitigate this somewhat by also including a list of the top 1,000 websites from Alexa, but this is not without its own problems.