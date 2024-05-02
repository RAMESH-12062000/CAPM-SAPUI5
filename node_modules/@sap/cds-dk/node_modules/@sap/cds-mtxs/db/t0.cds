namespace cds.xt;

entity Tenants {
    key ID         : String;
        metadata   : String;
        createdAt  : Timestamp @cds.on.insert : $now;
        modifiedAt : Timestamp @cds.on.insert : $now  @cds.on.update : $now;
}

entity Jobs {
    key ID        : String;
        status    : Status default #QUEUED;
        op        : String;
        error     : String;
        result    : LargeString;
        createdAt : Timestamp;
        tasks     : Composition of many Tasks on tasks.job = $self;
}

entity Tasks {
    key job       : Association to Jobs;
    key ID        : String;
        tenant    : String(100);
        op        : String;
        error     : String;
        status    : Status default #QUEUED;
        createdAt : Timestamp;
        database  : String;
}

type Status : String enum {
    QUEUED;
    RUNNING;
    FINISHED;
    FAILED;
}
