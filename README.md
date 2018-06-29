Beeprint
========

Beeprint is a tool for printing numbers to stdout as they would be displayed on an LCD screen. Each number is separated by an empty space.

Example:
```sh
$ beeprint 910
 _       _ 
|_|   | | |
  |   | |_|
```

Getting started
---------------

You have 2 main options to compile and run the `beeprint` executable: Node.JS and Docker.

In any case, you'll have to download this repository first:
```sh
$ git clone https://github.com/taratatach/beeprint
```

### Run via Docker (preferred way)

```sh
$ cd beeprint
$ ./configure
$ make
$ docker run beeprint <args>
```

### Run with Node.JS

```sh
$ cd beeprint
$ ./configure -N
$ make
$ ./index.js <args>
```

You can also make the executable available globally with one more step:

```sh
$ make install
$ beeprint <args>
```

Documentation and tests
-----------------

The tests act as the documentation for this project. You'll need a functionnal Node.JS install to run them.

```sh
$ cd beeprint
$ ./configure -N
$ make
$ make test
```

