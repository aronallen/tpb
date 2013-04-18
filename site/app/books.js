define(['lodash'], function(_){
  var GT = {
    'name': "Det Gamle Testamente",
    'nick': "gt",
    'books': [
    {
        'name': 'Første Mosebog',
        'nick': '1mos',
        'chapters': 50
    },
    {
        'name': 'Anden Mosebog',
        'nick': '2mos',
        'chapters': 40
    },
    {
        'name': 'Tredje Mosebog',
        'nick': '3mos',
        'chapters': 27
    },
    {
        'name': 'Fjerde Mosebog',
        'nick': '4mos',
        'chapters': 36
    },
    {
        'name': 'Femte Mosebog',
        'nick': '5mos',
        'chapters': 34
    },
    {
        'name': 'Josvabogen',
        'nick': 'jos',
        'chapters': 24
    },
    {
        'name': 'Dommerbogen',
        'nick': 'dom',
        'chapters': 21
    },
    {
        'name': 'Ruths Bog',
        'nick': 'ruth',
        'chapters': 4
    },
    {
        'name': 'Første Samuelsbog',
        'nick': '1sam',
        'chapters': 31
    },
    {
        'name': 'Anden Samuelsbog',
        'nick': '2sam',
        'chapters': 24
    },
    {
        'name': 'Første Kongebog',
        'nick': '1kong',
        'chapters': 22
    },
    {
        'name': 'Anden Kongebog',
        'nick': '2kong',
        'chapters': 25
    },
    {
        'name': 'Første Krønikebog',
        'nick': '1kron',
        'chapters': 29
    },
    {
        'name': 'Anden Krønikebog',
        'nick': '2kron',
        'chapters': 36
    },
    {
        'name': 'Ezras Bog',
        'nick': 'ezra',
        'chapters': 10

    },
    {
        'name': 'Nehemias’ Bog',
        'nick': 'neh',
        'chapters': 13
    },
    {
        'name': 'Esters Bog',
        'nick': 'est',
        'chapters': 10
    },
    {
        'name': 'Jobs Bog',
        'nick': 'job',
        'chapters': 42
    },
    {
        'name': 'Salmernes Bog',
        'nick': 'sl',
        'chapters': 150
    },
    {
        'name': 'Ordsprogenes Bog',
        'nick': 'ordsp',
        'chapters': 31
    },
    {
        'name': 'Prædikerens Bog',
        'nick': 'prad',
        'chapters': 12
    },
    {
        'name': 'Højsangen',
        'nick': 'hojs',
        'chapters': 8
    },
    {
        'name': 'Esajas’ Bog',
        'nick': 'es',
        'chapters': 66
    },
    {
        'name': 'Jeremias’ Bog',
        'nick': 'jer',
        'chapters': 52
    },
    {
        'name': 'Klagesangene',
        'nick': 'klages',
        'chapters': 5
    },
    {
        'name': 'Ezekiels Bog',
        'nick': 'ez',
        'chapters': 48
    },
    {
        'name': 'Daniels Bog',
        'nick': 'dan',
        'chapters': 12
    },
    {
        'name': 'Hoseas’ Bog',
        'nick': 'hos',
        'chapters': 14
    },
    {
        'name': 'Joels Bog',
        'nick': 'joel',
        'chapters': 4
    },
    {
        'name': 'Amos’ Bog',
        'nick': 'am',
        'chapters': 9
    },
    {
        'name': 'Obadias’ Bog',
        'nick': 'obadias',
        'chapters': 1
    },
    {
        'name': 'Jonas’ Bog',
        'nick': 'jon',
        'chapters': 4
    },
    {
        'name': 'Mikas Bog',
        'nick': 'mika',
        'chapters': 7
    },
    {
        'name': 'Nahums Bog',
        'nick': 'nah',
        'chapters': 3
    },
    {
        'name': 'Habakkuks Bog',
        'nick': 'hab',
        'chapters': 3
    },
    {
        'name': 'Sefanias’ Bog',
        'nick': 'sef',
        'chapters': 3
    },
    {
        'name': 'Haggajs Bog',
        'nick': 'hagg',
        'chapters': 2
    },
    {
        'name': 'Zakarias’ Bog',
        'nick': 'zak',
        'chapters': 14
    },
    {
        'name': 'Malakias’ Bog',
        'nick': 'mal',
        'chapters': 3
    }
    ]
}

var AP = {
    'name': 'De Apokryfe Skrifter',
    'nick': 'ap',
    'books': [
    {
        'name': 'Tobits Bog',
        'nick': 'tob',
        'chapters': 14
    },
    {
        'name': 'Judits Bog',
        'nick': 'judit',
        'chapters': 16
    },
    {
        'name': 'Tilføjelser til Esters Bog',
        'nick': 'tilfest',
        'chapters': 'F'
    },
    {
        'name': 'Første Makkabæerbog',
        'nick': '1makk',
        'chapters': 16
    },
    {
        'name': 'Anden Makkabæerbog',
        'nick': '2makk',
        'chapters': 15
    },
    {
        'name': 'Visdommens Bog',
        'nick': 'visd',
        'chapters': 19
    },
    {
        'name': 'Siraks Bog',
        'nick': 'sir',
        'chapters': 51,
        //0 is prolouge
        'first': 0
    },
    {
        'name': 'Manasses Bøn',
        'nick': 'manb',
        'chapters': 1
    },
    {
        'name': 'Baruks Bog',
        'nick': 'bar',
        'chapters': 5,
    },
    {
        'name': 'Jeremias’ Brev',
        'nick': 'jerbr',
        'chapters': 1
    },
    {
        'name': 'Tilføjelser til Daniels Bog',
        'nick': 'tilfdan',
        'chapters': 'C'
    }
    ]
}

var NT = {
    'name': 'Det Nye Testamente',
    'nick': 'nt',
    'books': [
  {
    'name' : 'Matthæusevangeliet',
    'nick' : 'matt',
    'chapters' : 28
  },
  {
    'name' : 'Markusevangeliet',
    'nick' : 'mark',
    'chapters' : 16
  },
  {
    'name' : 'Lukasevangeliet',
    'nick' : 'luk',
    'chapters' : 24
  },
  {
    'name' : 'Johannesevangeliet',
    'nick' : 'joh',
    'chapters' : 21
  },
  {
    'name' : 'Apostlenes Gerninger',
    'nick' : 'apg',
    'chapters' : 28
  },
  {
    'name' : 'Romerbrevet',
    'nick' : 'rom',
    'chapters' : 16
  },
  {
    'name' : 'Første Korintherbrev',
    'nick' : '1kor',
    'chapters' : 16
  },
  {
    'name' : 'Anden Korintherbrev',
    'nick' : '2kor',
    'chapters' : 13
  },
  {
    'name' : 'Galaterbrevet',
    'nick' : 'gal',
    'chapters' : 6
  },
  {
    'name' : 'Efeserbrevet',
    'nick' : 'ef',
    'chapters' : 6
  },
  {
    'name' : 'Filipperbrevet',
    'nick' : 'fil',
    'chapters' : 4
  },
  {
    'name' : 'Kolossenserbrevet',
    'nick' : 'kol',
    'chapters' : 4
  }, 
  {
    'name' : 'Første Thessalonikerbrev',
    'nick' : '1thess',
    'chapters' : 5
  },
  {
    'name' : 'Andet Thessalonikerbrev',
    'nick' : '2thess',
    'chapters' : 3
  },
  {
    'name' : 'Første Timotheusbrev',
    'nick' : '1tim',
    'chapters' : 6
  },
  {
    'name' : 'Andet Timotheusbrev',
    'nick' : '2tim',
    'chapters' : 4
  },
  {
    'name' : 'Titusbrevet',
    'nick' : 'tit',
    'chapters' : 3
  },
  {
    'name' : 'Filemonbrevet',
    'nick' : 'filem',
    'chapters' : 1
  },
  {
    'name' : 'Hebræerbrevet',
    'nick' : 'hebr',
    'chapters' : 13,
  },
  {
    'name' : 'Jakobsbrevet',
    'nick' : 'jak',
    'chapters' : 5,
  },
  {
    'name' : 'Første Petersbrev',
    'nick' : '1pet',
    'chapters' : 5
  }, 
  {
    'name' : 'Andet Petersbrev',
    'nick' : '2pet',
    'chapters' : 3
  }, 
  {
    'name' : 'Første Johannesbrev',
    'nick' : '1joh',
    'chapters' : 5
  },
  {
    'name' : 'Andet Johannesbrev',
    'nick' : '2joh',
    'chapters' : 1
  },
  {
    'name' : 'Tredje Johannesbrev',
    'nick' : '3joh',
    'chapters' : 1
  },
  {
    'name' : 'Judasbrevet',
    'nick' : 'jud',
    'chapters' : 1
  },
  {
    'name' : 'Johannes’ Åbenbaring',
    'nick' : 'ab',
    'chapters' : 22
  }
    ]
};
//return all books;
return [GT, NT, AP];
});