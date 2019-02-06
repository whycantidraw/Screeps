function distanceTo(a, b)
{
    var ar = creep.pos.getRangeTo(a);
    var br = creep.pos.getRangeTo(b);

    if(ar == br)
        return 0;

    return (ar > br ? 1 : -1);
}