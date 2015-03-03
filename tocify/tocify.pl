#!/usr/bin/perl -w
use strict;

# This program updates the table of contents of a given html file.
# The new table of contents is inserted at the <div class="toc">.
# It replaces anything that currently lives within this div.

my $filename = $ARGV[0] or die "No filename specified\n";
my @file;
my $structure = [];
&fill( 1, $structure, &nextheader );

open(my $fh, ">", $filename) or die "Can't open specified file\n";
select $fh;

my $in_contents = 0;
for (@file) {
  if ($in_contents) {
    if (/<\/div>/) {
      $in_contents = 0;
    }
  }
  else {
    print;
  }
  if (/( *)<div class="toc">/) {
      print "$1  <h1>Contents</h1>\n";
      &print_result( $structure, (length $1) + 2);
      print "$1</div>\n";
      $in_contents = 1;
  }
}

sub nextheader {
    while (<>) {
        push @file, $_;
        if ( $_ =~ /<h([1-6]) id="([^"]+)">([^<]+)/ ) {
            return [ $1, $2, $3 ];
        }
    }
}

sub fill {
    my $level  = shift;
    my $node   = shift;
    my $header = shift or die "No structure found\n";

    while ( $header->[0] >= $level ) {
        if ( $header->[0] > $level ) {
            my $new_node = [];
            push @{$node}, $new_node;
            $header = fill( $level + 1, $new_node, $header ) or return;

        }
        elsif ( $header->[0] == $level ) {
            push @{$node}, { anchor => $header->[1], title => $header->[2] };
            $header = nextheader or return;
        }
    }
    return $header;
}

sub print_result {
    my $node  = shift;
    my $level = shift;

    if ( ref $node eq 'ARRAY' ) {
        print " " x $level;
        print "<ul>\n";
        for (@{$node}) {
          print_result($_, $level + 2);
        }
        print " " x $level;
        print "</ul>\n";
    }
    else {
        print " " x $level;
        print "<li><a href=\"\#$node->{anchor}\">$node->{title}</a></li>\n";
    }
}
