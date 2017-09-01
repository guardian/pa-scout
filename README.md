# pa-scout

A command-line tool for searching the Press Association football data API

## Installation

npm install -g pa-scout

## Usage

    $ scout -h
    
      Usage: scout [options] <query>
    
    
      Options:
    
        -c, --competition <competition>  The competition to restrict results to
        -h, --help                       output usage information
		
You need to set your `PA_KEY` environment variable. Guardian employees ask @maxspencer for ours.
		
## Examples

1. Search find the competitions that "Man Utd" are playing in:

        $ scout "man utd"
        Champions League:
        [ { name: 'Man Utd', id: '12' } ]
        Premier League:
        [ { name: 'Man Utd', id: '12' } ]
        EFL Cup:
        [ { name: 'Man Utd', id: '12' } ]

2. Search for all teams with a name containing "Man" in all competitions:

		$ scout man
		Champions League:
		[ { name: 'Man City', id: '11' },
		  { name: 'Man Utd', id: '12' } ]
		League Two:
		[ { name: 'Mansfield', id: '58' } ]
		International friendlies:
		[ { name: 'Germany', id: '1678' } ]
		EFL Cup:
		[ { name: 'Man City', id: '11' },
		  { name: 'Man Utd', id: '12' },
		  { name: 'Mansfield', id: '58' } ]
		World Cup 2018 Qualifiers:
		[ { name: 'Germany', id: '1678' },
	      { name: 'Romania', id: '823' } ]
		Premier League:
		[ { name: 'Man City', id: '11' },
		  { name: 'Man Utd', id: '12' } ]
		FA Cup qualifying:
		[ { name: 'AFC Mansfield', id: '62772' },
		  { name: 'Bristol Manor Farm', id: '9409' },
		  { name: 'FC Romania', id: '62093' },
		  { name: 'Godmanchester Rovers', id: '10008' },
		  { name: 'Mangotsfield', id: '13107' },
		  { name: 'South Normanton Athletic', id: '9395' },
		  { name: 'Southend Manor', id: '10369' } ]

3. Search for all teams with a name containing "Man" which are playing in the "Premier League":

		$ scout -c "Premier League" Man
		Premier League:
		[ { name: 'Man City', id: '11' },
		  { name: 'Man Utd', id: '12' } ]

Note: everything is case-insensitive.
